import { XMarkSvg } from '../../svg/XMarkSvg'

interface Props {
  submitTagForm: (e: React.FormEvent<HTMLFormElement>) => void
  inputTag: (e: React.ChangeEvent<HTMLInputElement>) => void
  tag: string
  tagList: string[]
  deleteTag: (e: React.MouseEvent<HTMLButtonElement>) => void
  bg: string
}

export const DevelopTagForm = ({
  submitTagForm,
  inputTag,
  tag,
  tagList,
  deleteTag,
  bg,
}: Props) => {
  return (
    <div>
      <form className="mb-3" onSubmit={submitTagForm}>
        <input
          onChange={inputTag}
          value={tag}
          className={`w-full border-b py-3 pl-2 focus:outline-none ${bg}`}
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
            <button className="text-white" value={tag} onClick={deleteTag}>
              <XMarkSvg />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
