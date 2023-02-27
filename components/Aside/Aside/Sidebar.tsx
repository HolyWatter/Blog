import { useRouter } from 'next/router'
import { useCallback } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const clickMoveBtn = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    router.push(value)
  }, [])

  return (
    <div className="fixed mt-10 inline-block px-10 align-top md-m:hidden">
      <div className="flex flex-col space-y-5 pl-3">
        <button onClick={clickMoveBtn} value="/develop">
          개발일지
        </button>
        <button onClick={clickMoveBtn} value="/develop/post">
          개발일지 작성
        </button>
        <button onClick={clickMoveBtn} value="/guestbook">
          방명록 작성
        </button>
      </div>
    </div>
  )
}
