import { Input } from '../Public/AuthInput'

interface Props {
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void
  info: {
    email: string
    password: string
  }
  inputInfo: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function LoginForm({ submitForm, inputInfo, info }: Props) {
  return (
    <form
      onSubmit={submitForm}
      className="my-5 mx-auto flex w-full flex-col justify-center space-y-5"
    >
      <Input
        placeholder="이메일을 입력하세요"
        onChange={inputInfo}
        type="email"
        name="email"
        value={info.email}
      />
      <Input
        placeholder="비밀번호를 입력하세요"
        onChange={inputInfo}
        type="password"
        name="password"
        value={info.password}
      />
      <button className="h-10 border" type="submit">
        로그인
      </button>
    </form>
  )
}
