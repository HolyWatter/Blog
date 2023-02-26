import { useRouter } from 'next/router'
import { changeTimeFormatFunction } from '../../../src/function/changeTimeFormatFunction'
import { moveBtnFunction } from '../../../src/function/moveBtnFunction'
import { PostingType } from '../../../src/interface'

interface Props {
  posting: PostingType
}

export const MarkdownPosting = ({ posting }: Props) => {
  const router = useRouter()
  const time = changeTimeFormatFunction(posting.created)

  return (
    <button
      className="text-start"
      value={`/develop/${posting.id}`}
      onClick={(e) => moveBtnFunction(e, router.push)}
    >
      <div className="space-y-5 border-b-2 py-3 px-4">
        <p className="text-3xl font-normal text-gray-700">{posting.title}</p>
        <div className="flex justify-between sm-m:flex-col">
          <div className="flex items-center space-x-3">
            <p className="text-lg">{posting.author.nickname}</p>
            <p className="text-gray-500">{time}</p>
          </div>
          <p>{posting.comments.length} 개의 댓글</p>
        </div>
      </div>
    </button>
  )
}
