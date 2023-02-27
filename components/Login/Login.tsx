import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
} from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { loginModal, signupModal } from '../../src/Atom'
import { ModalBg } from '../Public/Button/Modal/ModalBg'
import { XMarkSvg } from '../svg/XMarkSvg'
import LoginForm from './LoginForm'

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      acessToken
      loginUser {
        id
        nickname
      }
      message
    }
  }
`

interface Props {
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

export default function Login({ refetch }: Props) {
  const setLoginModal = useSetRecoilState(loginModal)
  const setSignupModal = useSetRecoilState(signupModal)
  const [info, setInfo] = useState({
    email: '',
    password: '',
  })
  const [login, { error, data }] = useMutation(LOGIN)

  useEffect(() => {
    if (error) {
      alert(error.message)
    }
    if (data?.login.message) {
      localStorage.setItem('token', data.login.acessToken)
      alert(data.login.message)
      setLoginModal((prev) => !prev)
      refetch()
    }
  }, [error, data])

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

  const submitForm = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await login({ variables: info })
    },
    [info]
  )

  const closeModal = useCallback(() => {
    setLoginModal((prev: boolean) => !prev)
  }, [])

  const clickSignUp = useCallback(() => {
    closeModal()
    setSignupModal(true)
  }, [])

  return (
    <ModalBg>
      <div className="absolute top-[50%] left-[50%] flex translate-y-[-50%] translate-x-[-50%] flex-col items-center rounded-sm border bg-white py-10 px-10 xs:w-[330px]">
        <button
          onClick={closeModal}
          className="absolute top-5 right-3 text-gray-600"
        >
          <XMarkSvg />
        </button>
        <p className="whitespace-nowrap py-5 text-2xl font-semibold">
          성수의 블로그 로그인
        </p>
        <p className="py-5 text-center text-sm text-gray-500">
          회원가입 및 로그인하시면 간단한 댓글작성 및 방명록작성이 가능합니다
        </p>
        <LoginForm submitForm={submitForm} info={info} inputInfo={inputInfo} />
        <div className="flex items-center space-x-4">
          <p className="text-md whitespace-nowrap">아직 회원이 아니신가요?</p>
          <button
            className="whitespace-nowrap text-sm text-blue-500 underline"
            onClick={clickSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </ModalBg>
  )
}
