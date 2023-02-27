import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useApolloClient,
  useMutation,
} from '@apollo/client'
import React, { useCallback, useEffect, useState } from 'react'
import { CURRENTUSER } from '../../src/gql/currentUser'
import { BlueBtnWhite } from '../Public/Button/BlueBtnWhite'
import { GrayBtnWhite } from '../Public/Button/GrayBtnWhite'
import { ModalBg } from '../Public/Button/Modal/ModalBg'
import { ModalInside } from '../Public/Button/Modal/ModalInside'
import CropProfile from '../SignUp/CropProfile'

interface Props {
  setIsModifyImg: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const MODIFYIMG = gql`
  mutation modifyProfileImg($img: Upload) {
    modifyProfileImg(img: $img) {
      nickname
      email
      role
      thumbnail_url
    }
  }
`

export const ModifyProfileImg = ({ setIsModifyImg, refetch }: Props) => {
  const [img, setImg] = useState<string>()
  const [cropImg, setCropImg] = useState<string>()
  const client = useApolloClient()
  const [imgMutation] = useMutation(MODIFYIMG)

  const clickClose = useCallback(() => {
    setIsModifyImg((prev) => !prev)
  }, [])

  const selectImg = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (finishedEvent) => {
      const { result } = finishedEvent.currentTarget as any
      setImg(result)
    }
  }, [])
  const submitMutation = useCallback(async () => {
    await imgMutation({
      variables: {
        img: cropImg,
      },
    }).then((res) =>
      client.writeQuery({
        query: CURRENTUSER,
        data: { currentUser: res.data.modifyProfileImg },
      })
    )
    alert('프로필 사진이 변경되었습니다.')
    clickClose()
  }, [cropImg])

  return (
    <ModalBg>
      <ModalInside>
        <div className="max-h-[600px] overflow-y-auto">
          <p className="px-3 py-2">프로필 이미지 수정</p>
          <div className="border-b" />
          <input
            onChange={selectImg}
            className="w-full py-5 pl-3"
            type="file"
            multiple={false}
            accept="image/*"
          />
          <div className="w-full px-3 pr-5">
            <CropProfile img={img} setProfileImg={setCropImg} />
          </div>
          <div className="flex justify-center space-x-4 py-3">
            <GrayBtnWhite onClick={clickClose}>닫기</GrayBtnWhite>
            <BlueBtnWhite onClick={submitMutation}>수정</BlueBtnWhite>
          </div>
        </div>
      </ModalInside>
    </ModalBg>
  )
}
