import { gql, useApolloClient, useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginModal, signupModal } from '../../src/Atom'
import { moveBtnFunction } from '../../src/function/moveBtnFunction'
import Login from '../Login/Login'
import SignUp from '../SignUp/SignUp'
import { DownArrow } from '../svg/DownArrow'
import { Menu } from './Menu'

const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      nickname
      email
      role
      thumbnail_url
    }
  }
`

export const Nav = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false)
  const isLoginModal = useRecoilValue(loginModal)
  const isSignupModal = useRecoilValue(signupModal)
  const setLoginModal = useSetRecoilState(loginModal)
  const router = useRouter()
  const client = useApolloClient()

  const clickLogin = () => {
    setLoginModal(true)
  }

  const { data, refetch } = useQuery(CURRENTUSER)

  const clickProfile = () => {
    setIsMenu((prev) => !prev)
  }

  const logout = async () => {
    localStorage.removeItem('token')
    alert('로그아웃되었습니다.')
    setIsMenu(false)
    client.writeQuery({
      query: CURRENTUSER,
      data: {
        currentUser: null,
      },
    })
  }

  return (
    <div>
      <div className="fixed z-20 flex h-16 w-full items-center justify-between border-b bg-origin px-5 shadow-md">
        <button
          value="/"
          onClick={(e) => moveBtnFunction(e, router.push)}
          className="text-2xl font-normal text-gray-300"
        >
          성수의 블로그
        </button>
        {data?.currentUser ? (
          <button
            className="flex items-center space-x-2"
            onClick={clickProfile}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-400">
              <Image
                width={44}
                height={44}
                className="h-11 w-11 rounded-full bg-white"
                alt=""
                src={data?.currentUser?.thumbnail_url}
              />
            </div>
            <DownArrow />
          </button>
        ) : (
          <button
            onClick={clickLogin}
            className="rounded-full bg-white px-2 py-1 text-origin"
          >
            로그인
          </button>
        )}
        {isLoginModal && <Login refetch={refetch} />}
        {isSignupModal && <SignUp />}
      </div>
      {isMenu && <Menu logout={logout} setIsMenu={setIsMenu} />}
    </div>
  )
}
