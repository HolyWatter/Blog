import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'
import { User } from '../../src/interface'
import { ModifyProfileImg } from './ModifyProfileImg'

interface Props {
  userInfo: User
  setIsModifyProfile: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

export const UserInfo = ({ userInfo, setIsModifyProfile, refetch }: Props) => {
  const [isModifyImg, setIsModifyImg] = useState<boolean>(false)
  const clickModify = () => {
    setIsModifyProfile((prev) => !prev)
  }

  const clickModifyImg = () => {
    setIsModifyImg((prev) => !prev)
  }

  return (
    <div className="relative rounded-md border p-3">
      <div className="flex">
        <div className="relative">
          <Image
            width={150}
            height={150}
            alt="userProfileImg"
            src={userInfo?.thumbnail_url}
            className=" h-[150px] w-[150px] rounded-full border"
          />
          <button
            className="absolute bottom-2 right-[-5px] rounded-full bg-gray-300 p-2"
            onClick={clickModifyImg}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-3 pl-5">
          <div className="flex space-x-3">
            <p className="text-lg">이메일 주소</p>
            <p className="text-lg">{userInfo?.email}</p>
          </div>
          <div className="flex space-x-10">
            <p className="text-lg">닉네임</p>
            <p className="text-lg">{userInfo?.nickname}</p>
          </div>
        </div>
      </div>
      <button
        onClick={clickModify}
        className="absolute right-3 bottom-3 rounded-md border bg-slate-300 px-2 py-1 text-origin"
      >
        회원탈퇴
      </button>
      {isModifyImg && (
        <ModifyProfileImg refetch={refetch} setIsModifyImg={setIsModifyImg} />
      )}
    </div>
  )
}
