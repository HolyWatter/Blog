import { User } from "../../src/interface";

interface Props {
  userInfo: User
}

export default function Log({ userInfo }: Props) {
  return (
    <div className="mt-10 text-xl font-normal text-gray-900">
      <div className="relative rounded-md border py-5">
        <p className="absolute top-[-14px] left-2 bg-bg px-3">활동이력 요약</p>
        <div className="flex justify-around">
          <div className="flex flex-col items-center space-y-3">
            <p className="text-gray-400">게시글</p>
            <p className="text-5xl font-extralight text-gray-400">
              {userInfo?.markdown?.length + userInfo?.posts?.length}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <p className="text-gray-400">댓글</p>
            <p className="text-5xl font-extralight text-gray-400">
              {userInfo?.Comment?.length + userInfo?.MarkdownComment?.length}{' '}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <p className="text-gray-400">방명록</p>
            <p className="text-5xl font-extralight text-gray-400">
              {userInfo?.GuestBook?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
