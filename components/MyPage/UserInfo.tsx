import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { User } from '../../src/interface'
import { CameraSvg } from '../svg/CameraSvg'
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

  const clickModify = useCallback(() => {
    setIsModifyProfile((prev) => !prev)
  }, [])

  const clickModifyImg = useCallback(() => {
    setIsModifyImg((prev) => !prev)
  }, [])
  
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
            <CameraSvg />
          </button>
        </div>
        <div className="space-y-3 pl-5">
          <div className="flex sm:space-x-3">
            <p className="whitespace-nowrap text-lg sm-m:hidden">이메일 주소</p>
            <p className="text-lg">{userInfo?.email}</p>
          </div>
          <div className="flex sm:space-x-10">
            <p className="whitespace-nowrap text-lg sm-m:hidden">닉네임</p>
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
