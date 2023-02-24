import React, { useState } from 'react'
import { SignUpInfo } from '../../src/interface'
import { Input } from '../Public/AuthInput'
import CropProfile from './CropProfile'

interface Props {
  submitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  inputInfo: (e: React.ChangeEvent<HTMLInputElement>) => void
  info: SignUpInfo
  setProfileImg: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function SignUpForm({
  submitForm,
  inputInfo,
  info,
  setProfileImg,
}: Props) {
  const [img, setImg] = useState<string>()

  const selectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files![0]
    const reader = new FileReader()
    reader.readAsDataURL(img)
    reader.onloadend = (finishedEvent) => {
      const { currentTarget } = finishedEvent
      setImg((currentTarget as any).result)
    }
  }

  return (
    <form
      onSubmit={submitForm}
      className="my-5 mx-auto flex w-[400px] flex-col justify-center space-y-5"
    >
      <Input
        onChange={inputInfo}
        placeholder="이메일을 입력해주세요"
        value={info.email}
        name="email"
        type="email"
      />
      <Input
        onChange={inputInfo}
        placeholder="비밀번호를 입력해주세요"
        value={info.password}
        name="password"
        type="password"
      />
      <Input
        onChange={inputInfo}
        placeholder="이름을 입력해주세요"
        value={info.user_name}
        name="user_name"
        type="text"
      />
      <Input
        onChange={inputInfo}
        placeholder="사용할 닉네임을 입력해주세요"
        value={info.nickname}
        name="nickname"
        type="text"
      />

      <div className="relative border py-7 px-3">
        <p className="px-2 absolute top-[-10px] text-gray-400 bg-white">프로필 사진을 등록하세요</p>
        <input
          className="pb-4"
          onChange={selectImg}
          type="file"
          multiple={false}
          accept="image/*"
        />
        <CropProfile img={img} setProfileImg={setProfileImg} />
      </div>
      <button className="h-10 rounded-sm border">회원가입</button>
    </form>
  )
}
