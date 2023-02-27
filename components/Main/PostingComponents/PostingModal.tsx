import { Dispatch, SetStateAction } from 'react'
import { ModalBg } from '../../Public/Button/Modal/ModalBg'
import { ModalInside } from '../../Public/Button/Modal/ModalInside'

interface Props {
  clickClose: () => void
  setIsDelete: Dispatch<SetStateAction<boolean>>
  setIsModify: Dispatch<SetStateAction<boolean>>
}

export const PostingModal = ({
  clickClose,
  setIsDelete,
  setIsModify,
}: Props) => {
  return (
    <ModalBg>
      <ModalInside>
        <div className="flex min-w-[350px] flex-col space-y-5 py-5">
          <button
            className="text-red-400"
            onClick={() => {
              clickClose()
              setIsDelete((prev) => !prev)
            }}
          >
            게시글 삭제하기
          </button>
          <button
            onClick={() => {
              clickClose()
              setIsModify((prev) => !prev)
            }}
          >
            게시글 수정하기
          </button>
          <button onClick={clickClose}>닫기</button>
        </div>
      </ModalInside>
    </ModalBg>
  )
}
