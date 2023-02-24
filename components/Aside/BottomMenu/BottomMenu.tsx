import { gql, useApolloClient, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginModal } from '../../../src/Atom'
import { moveBtnFunction } from '../../../src/function/moveBtnFunction'

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
  const logout = async () => {
    localStorage.removeItem('token')
    alert('로그아웃되었습니다.')
    client.writeQuery({
      query: CURRENTUSER,
      data: {
        currentUser: null,
      },
    })
  }

  const clickLogin = () => {
    setLoginModal(true)
  }

  return (
    <div className="fixed bottom-0 left-0 z-10 flex h-20 w-full items-center justify-between bg-origin px-10 text-white shadow-md md:hidden">
      <button
        onClick={(e) => moveBtnFunction(e, router.push)}
        className="flex flex-col items-center"
        value="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <p className="text-sm text-gray-400">홈</p>
      </button>
      <button
        onClick={(e) => moveBtnFunction(e, router.push)}
        className="flex flex-col items-center"
        value="/develop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
          />
        </svg>
        <p className="text-sm text-gray-400">포스팅 목록</p>
      </button>
      <button
        onClick={(e) => moveBtnFunction(e, router.push)}
        className="flex flex-col items-center"
        value="/develop/post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m6-6H6"
          />
        </svg>
        <p className="text-sm text-gray-400">포스팅 추가</p>
      </button>
      <button
        onClick={(e) => moveBtnFunction(e, router.push)}
        className="flex flex-col items-center"
        value="/mypage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <p className="text-sm text-gray-400">마이페이지</p>
      </button>
      {data?.currentUser ? (
        <button
          onClick={logout}
          value="/mypage"
          className="flex flex-col items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <p className="text-sm text-gray-400">로그아웃</p>
        </button>
      ) : (
        <button onClick={clickLogin} value="/login" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <p className="text-sm text-gray-400">로그인</p>
        </button>
      )}
    </div>
  )
}
