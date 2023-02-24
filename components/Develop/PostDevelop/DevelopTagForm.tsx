interface Props {
  submitTagForm: (e: React.FormEvent<HTMLFormElement>) => void
  inputTag: (e: React.ChangeEvent<HTMLInputElement>) => void
  tag: string
  tagList: string[]
  deleteTag: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DevelopTagForm({
  submitTagForm,
  inputTag,
  tag,
  tagList,
  deleteTag,
}: Props) {
  return (
    <div>
      <form className="mb-3" onSubmit={submitTagForm}>
        <input
          onChange={inputTag}
          value={tag}
          className="w-full border-b bg-bg py-3 pl-2 focus:outline-none"
          placeholder="태그를 입력하세요"
        />
      </form>
      <div className="flex flex-wrap space-x-1">
        {tagList.map((tag) => (
          <div
            key={tag}
            className="my-1 flex items-center space-x-2 rounded-full bg-origin py-1 px-3"
          >
            <p className="text-[8px] text-white">{tag}</p>
            <button value={tag} onClick={deleteTag}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-3 w-3 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
