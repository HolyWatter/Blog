import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useApolloClient,
  useMutation,
  useQuery,
} from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { User } from '../../src/interface'
import { BlueBtnWhite } from '../Public/Button/BlueBtnWhite'
import { GrayBtnWhite } from '../Public/Button/GrayBtnWhite'
import { ModalBg } from '../Public/Button/Modal/ModalBg'
import { ModalInside } from '../Public/Button/Modal/ModalInside'
import { CURRENTUSER } from '../../src/gql/currentUser'

interface Props {
  setIsModifyProfile: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: User
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const DELETEUSER = gql`
  mutation deleteUserInfo($email: String!) {
    deleteUserInfo(email: $email) {
      id
    }
  }
`

export const ModifyProfile = ({
  setIsModifyProfile,
  userInfo,
  refetch,
}: Props) => {
  const [email, setEmail] = useState<string>('')
  const clickClose = () => {
    setIsModifyProfile((prev) => !prev)
  }
  const client = useApolloClient()
  const currentUser = useQuery(CURRENTUSER)
  const router = useRouter()

  const [deleteMutation, { data, error }] = useMutation(DELETEUSER)

  const inputEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const clickDelete = useCallback(async () => {
    if (userInfo?.email !== email) {
      alert('정보가 일치하지 않습니다.')
    }
    await deleteMutation({
      variables: {
        email,
      },
    })
    if (data === undefined) {
      alert('정상적으로 탈퇴되었습니다.')
      client.writeQuery({
        query: CURRENTUSER,
        data: {
          currentUser: null,
        },
      })
      currentUser.refetch()
      router.push('/')
    }
  }, [email, currentUser, data]
)
  return (
    <ModalBg>
      <ModalInside>
        <div>
          <p className="px-3 py-2">회원 탈퇴</p>
          <div className="border-b" />
          <div className="px-10 py-5 text-center text-gray-400">
            <p className="">회원 탈퇴시 모든 정보가 사라집니다.</p>
            <p>정말로 삭제를 원하시면 아래에 이메일 주소를 입력해주세요.</p>
            <input
              onChange={inputEmail}
              value={email}
              className="my-5 w-full rounded-md border bg-origin py-2 pl-3 focus:outline-none "
            />
          </div>
          <div className="flex justify-center space-x-4 py-3">
            <GrayBtnWhite onClick={clickClose}>닫기</GrayBtnWhite>
            <BlueBtnWhite onClick={clickDelete}>탈퇴</BlueBtnWhite>
          </div>
        </div>
      </ModalInside>
    </ModalBg>
  )
}
