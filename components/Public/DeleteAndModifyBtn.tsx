import { TrashCan } from '../svg/TrashCanSvg'
import { WriteMark } from '../svg/WriteMark'

interface Props {
  clickModify: () => void
  clickDelete: () => void
}

export default function DeleteAndModifyBtn({
  clickModify,
  clickDelete,
}: Props) {
  return (
    <div className="flex space-x-2">
      <button className="삭제" onClick={clickDelete}>
        <TrashCan />
      </button>
      <button onClick={clickModify} className="수정">
        <WriteMark />
      </button>
    </div>
  )
}
