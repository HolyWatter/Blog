interface Props {
  submitComment: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  comment: string
  inputComment: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PostingCommentForm = ({
  submitComment,
  inputComment,
  comment,
}: Props) => {
  return (
    <form className="flex w-full" onSubmit={submitComment}>
      <input
        onChange={inputComment}
        value={comment}
        placeholder="댓글을 입력하세요"
        className="w-[85%] rounded-md py-1 pl-3"
      />
      <button className="w-[15%] rounded-md bg-origin py-1 px-2 font-light text-white">
        입력
      </button>
    </form>
  )
}
