import { gql, useApolloClient, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { loginModal } from '../../../src/Atom'
import { logoutFunction } from '../../../src/function/logoutFunction'
import { ChatMarkSvg } from '../../svg/ChatMarkSvg'
import { HomeSvg } from '../../svg/Home'
import { ListSvg } from '../../svg/ListSvg'
import { LoginSvg } from '../../svg/LoginSvg'
import { LogoutSvg } from '../../svg/LogoutSvg'
import { MyPageSvg } from '../../svg/MyPageSvg'

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

export const BottomMenu = () => {
  const router = useRouter()
  const { data } = useQuery(CURRENTUSER)
  const client = useApolloClient()
  const setLoginModal = useSetRecoilState(loginModal)

  const clickMoveBtn = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    router.push(value)
  }, [])

  const clickLogin = useCallback(() => {
    setLoginModal(true)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 z-10 flex h-20 w-full items-center justify-between bg-origin px-10 text-white shadow-md sm:px-5 md:hidden">
      {BTNCONTENTS.map((item) => (
        <button
          value={item.value}
          className={BTNCLASSNAME}
          key={item.id}
          onClick={clickMoveBtn}
        >
          {item.svg}
          <p className="text-sm text-gray-400">{item.text}</p>
        </button>
      ))}
      {data?.currentUser ? (
        <button
          onClick={() => logoutFunction(client, CURRENTUSER)}
          value="/mypage"
          className={BTNCLASSNAME}
        >
          <LogoutSvg />
          <p className="text-sm text-gray-400">로그아웃</p>
        </button>
      ) : (
        <button onClick={clickLogin} value="/login" className={BTNCLASSNAME}>
          <LoginSvg />
          <p className="text-sm text-gray-400">로그인</p>
        </button>
      )}
    </div>
  )
}

const BTNCLASSNAME = 'flex flex-col items-center'
const BTNCONTENTS = [
  { id: 0, text: '홈', value: '/', svg: <HomeSvg /> },
  { id: 1, text: '포스팅 목록', value: '/develop', svg: <ListSvg /> },
  { id: 2, text: '방명록', value: '/guestbook', svg: <ChatMarkSvg /> },
  { id: 3, text: '마이페이지', value: '/mypage', svg: <MyPageSvg /> },
]
