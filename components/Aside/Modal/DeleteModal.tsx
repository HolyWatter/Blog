import { BlueBtnWhite } from '../../Public/Button/BlueBtnWhite'
import { GrayBtnWhite } from '../../Public/Button/GrayBtnWhite'
import { ModalBg } from '../../Public/Button/Modal/ModalBg'
import { ModalInside } from '../../Public/Button/Modal/ModalInside'

interface Props {
  clickClose: () => void
  clickConfirm: () => void
  message: string
}

export const DeleteModal = ({ message, clickClose, clickConfirm }: Props) => {
  return (
    <ModalBg>
      <ModalInside>
        <div>
          <p className="py-2">{message} 삭제</p>
          <div className="border-b" />
          <div className="pt-5 pb-7 text-gray-500">
            <p className="whitespace-nowrap px-[50px]">
              정말로 {message}을 삭제하시겠습니까?
            </p>
            <p className="whitespace-nowrap px-5">
              삭제 한 뒤에는 복구할 수 없습니다.
            </p>
          </div>
          <div className="border-b" />
          <div className="flex justify-center space-x-5 py-3">
            <GrayBtnWhite onClick={clickClose}>닫기</GrayBtnWhite>
            <BlueBtnWhite onClick={clickConfirm}>삭제</BlueBtnWhite>
          </div>
        </div>
      </ModalInside>
    </ModalBg>
  )
}
