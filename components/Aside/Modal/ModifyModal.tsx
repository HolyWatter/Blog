import { BlueBtnWhite } from '../../Public/Button/BlueBtnWhite'
import { GrayBtnWhite } from '../../Public/Button/GrayBtnWhite'
import { ModalBg } from '../../Public/Button/Modal/ModalBg'
import { ModalInside } from '../../Public/Button/Modal/ModalInside'

interface Props {
  value: string
  setFunction: React.Dispatch<React.SetStateAction<string>>
  clickClose: () => void
  clickConfirm: () => Promise<void>
  message: string
}

export const ModifyModal = ({
  value,
  message,
  clickClose,
  setFunction,
  clickConfirm,
}: Props) => {
  const inputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFunction(e.target.value)
  }

  return (
    <ModalBg>
      <ModalInside>
        <div>
          <div>
            <p className="py-5 text-center">{message} 수정</p>
            <textarea
              onChange={inputText}
              value={value}
              className="w-full resize-none py-1 pl-5 focus:outline-none"
              placeholder={`${message}을 수정하세요`}
            />
          </div>
          <div className="flex justify-center space-x-3 py-3">
            <GrayBtnWhite onClick={clickClose}>닫기</GrayBtnWhite>
            <BlueBtnWhite onClick={clickConfirm}>수정</BlueBtnWhite>
          </div>
        </div>
      </ModalInside>
    </ModalBg>
  )
}
