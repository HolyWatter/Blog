import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { logoutFunction } from '../../src/function/logoutFunction'
import { moveBtnFunction } from '../../src/function/moveBtnFunction'
import { CURRENTUSER } from '../../src/gql/currentUser'

interface Props {
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export const Menu = ({ setIsMenu }: Props) => {
  const router = useRouter()
  const client = useApolloClient()

  const clickMypage = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    moveBtnFunction(e, router.push)
    setIsMenu((prev) => !prev)
  }, [])

  const clickLogout = useCallback(() => {
    logoutFunction(client, CURRENTUSER)
    setIsMenu((prev) => !prev)
  }, [])

  return (
    <div className="fixed top-[64px] right-[20px] z-10 flex w-[170px] flex-col items-start space-y-4 rounded-md bg-origin py-5 pl-3 text-gray-200">
      <button value="/mypage" onClick={clickMypage}>
        내활동
      </button>
      <button className="" onClick={clickLogout}>
        로그아웃
      </button>
    </div>
  )
}
