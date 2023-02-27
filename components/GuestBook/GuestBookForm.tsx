import { BlueBtnWhite } from '../Public/Button/BlueBtnWhite'

interface Props {
  submitGuestBook: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  inputText: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  text: string
}

export const GuestBookForm = ({ submitGuestBook, inputText, text }: Props) => {
  return (
    <form
      className="mt-10 flex h-16 w-full items-center"
      onSubmit={submitGuestBook}
    >
      <textarea
        onChange={inputText}
        value={text}
        placeholder="방명록을 작성해주세요"
        className="h-16 w-[85%] resize-none rounded-md border bg-bg py-3 pl-3 focus:border-[2px] focus:border-origin focus:outline-none "
      />
      <BlueBtnWhite onClick={() => {}}>작성</BlueBtnWhite>
    </form>
  )
}
