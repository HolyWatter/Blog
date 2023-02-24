import { useEffect, useState } from 'react'
import { SignUpInfo } from '../../src/interface'
import { useMutation, gql } from '@apollo/client'
import SignUpForm from './SignUpForm'
import { useSetRecoilState } from 'recoil'
import { loginModal, signupModal } from '../../src/Atom'

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

  const [signUp, { error, data }] = useMutation(SIGNUP)

  useEffect(()=>{
    document.body.style.overflow ="hidden"
    return ()=>{
      document.body.style.overflow ="unset"
    }
  })

  useEffect(() => {
    if (data?.signup === null) {
      alert('회원가입되었습니다.')
      toLogin()
    }
    if (error?.message.includes('User_email_key'))
      return alert('이미 사용중인 이메일입니다.')
    if (error?.message.includes('User_nickname_key'))
      return alert('이미 사용중인 닉네임입니다.')
  }, [error?.message, data])

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signUp({ variables: { ...info, thumbnail: profileImg } })
  }

  const toLogin = () => {
    setSignupModal((prev) => !prev)
    setLoginModal((prev) => !prev)
  }

  const inputInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setInfo({
      ...info,
      [name]: value,
    })
  }

  const closeModal = () => {
    setSignupModal((prev) => !prev)
  }

  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 h-screen w-full bg-black/70 z-30">
      <div className="absolute top-[50%] left-[50%] flex max-h-[700px] translate-y-[-50%] translate-x-[-50%] flex-col items-center overflow-y-auto rounded-sm border bg-white py-10 px-10 xs-m:w-[330px] sm:w-[450px] ">
        <button
          onClick={closeModal}
          className="absolute top-5 right-3 text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <p className="py-5 text-3xl font-semibold whitespace-nowrap">성수의 블로그 회원가입</p>
        <p className="py-5 text-sm text-gray-500 text-center">
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
    </div>
  )
}
