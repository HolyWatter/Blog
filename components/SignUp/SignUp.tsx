import { useCallback, useEffect, useState } from 'react'
import { SignUpInfo } from '../../src/interface'
import { useMutation, gql } from '@apollo/client'
import SignUpForm from './SignUpForm'
import { useSetRecoilState } from 'recoil'
import { loginModal, signupModal } from '../../src/Atom'
import { ModalBg } from '../Public/Button/Modal/ModalBg'
import { XMarkSvg } from '../svg/XMarkSvg'

const SIGNUP = gql`
  mutation SignUp(
    $email: String!
    $password: String!
    $nickname: String!
    $user_name: String!
    $thumbnail: Upload
  ) {
    signup(
      email: $email
      password: $password
      nickname: $nickname
      user_name: $user_name
      thumbnail: $thumbnail
    ) {
      id
      nickname
      user_name
      email
      password
    }
  }
`

export default function SignUp() {
  const [info, setInfo] = useState<SignUpInfo>({
    email: '',
    password: '',
    nickname: '',
    user_name: '',
  })
  const [profileImg, setProfileImg] = useState<string>()
  const setSignupModal = useSetRecoilState(signupModal)
  const setLoginModal = useSetRecoilState(loginModal)
  const [signUp, { error, data, loading }] = useMutation(SIGNUP)

  useEffect(() => {
    if (data?.signup === null) {
      alert('회원가입되었습니다.')
      toLogin()
    }
  }, [data])

  const submitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(info.email === ""){
        alert('이메일을 입력해주세요.')
      }
      else if(info.password === ""){
        alert('비밀번호를 입력해주세요.')
      }
      else if(info.nickname === ""){
        alert('닉네임을 입력해주세요.')
      }
      else if(info.user_name === ""){
        alert('이름을 입력해주세요')
      }
      else await signUp({ variables: { ...info, thumbnail: profileImg } })
    },
    [info, profileImg]
  )

  const toLogin = useCallback(() => {
    setSignupModal((prev) => !prev)
    setLoginModal((prev) => !prev)
  }, [])

  const inputInfo = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setInfo({
        ...info,
        [name]: value,
      })
    },
    [info]
  )

  const closeModal = useCallback(() => {
    setSignupModal((prev) => !prev)
  }, [])

  return (
    <ModalBg>
      <div className="absolute top-[50%] left-[50%] flex max-h-[700px] translate-y-[-50%] translate-x-[-50%] flex-col items-center overflow-y-auto rounded-sm border bg-white py-10 px-10 xs-m:w-[330px] sm:w-[450px] ">
        <button
          onClick={closeModal}
          className="absolute top-5 right-3 text-gray-600"
        >
          <XMarkSvg />
        </button>
        <p className="whitespace-nowrap py-5 text-2xl font-semibold">
          성수의 블로그 회원가입
        </p>
        <p className="py-5 text-center text-sm text-gray-500">
          회원가입 및 로그인하시면 간단한 댓글작성 및 방명록작성이 가능합니다
        </p>
        <SignUpForm
          setProfileImg={setProfileImg}
          submitForm={submitForm}
          inputInfo={inputInfo}
          info={info}
        />
        <div className="flex items-center space-x-4">
          <p className="text-md">이미 회원이 신가요?</p>
          <button className="text-sm text-blue-500 underline" onClick={toLogin}>
            로그인
          </button>
        </div>
      </div>
    </ModalBg>
  )
}
