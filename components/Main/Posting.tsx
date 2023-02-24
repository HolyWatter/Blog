
import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
  useQuery,
} from '@apollo/client'
import { useState } from 'react'
import { PostingType } from '../../src/interface'
import SwiperComponents from '../Public/SwiperComponents'
import PostingComments from './PostingComments'
import { PostingModal } from './PostingModal'

interface Props {
  posting: PostingType
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const ADDCOMMENT = gql`
  mutation addPostingComment($text: String!, $postingId: Int!) {
    addPostingComment(text: $text, postingId: $postingId) {
      text
      id
    }
  }
`
const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      nickname
      email
      role
      thumbnail_url
    }
  }
`

export default function Posting({ posting, refetch }: Props) {
  const [comment, setComment] = useState('')
  const [isModal, setIsModal] = useState<boolean>(false)
  const {data} = useQuery(CURRENTUSER);
  const [addComment] = useMutation(ADDCOMMENT)

  const date = new Date(posting.created)
  const timeFormat = new Intl.DateTimeFormat('KR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
  const inputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addComment({
      variables: {
        text: comment,
        postingId: posting.id,
      },
    })
    setComment('')
    refetch()
  }

  const clickModalBtn = () => {
    setIsModal((prev) => !prev)
  }


  return (
    <div className="my-5 rounded-md border">
      <div className="flex flex-col justify-center space-y-3 py-2 pl-3">
        <div className="flex justify-between pt-1 pr-2">
          <p>{posting.author.nickname}</p>
          {posting?.author?.nickname === data?.currentUser?.nickname && (
            <button onClick={clickModalBtn} className="pr-2">
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
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500">{timeFormat}</p>
      </div>
      <div className='min-w-[100px] max-w-[450px] sm-m:max-w-[300px]'>{posting.img && <SwiperComponents img={posting.img} />}</div>
      <div className="border-b"></div>
      <div className="py-3 pl-3">
        <div className="flex items-center space-x-5">
          <p className="font-semibold">{posting.author.nickname}</p>
          <p className="text-[16px]">{posting.title}</p>
        </div>
        <p>{posting.text}</p>
        <div className="flex flex-wrap space-x-2 pt-3 ">
          {posting.tag?.map((tag) => (
            <p
              key={tag.id}
              className="mb-1 rounded-full bg-origin px-3 py-1 text-xs text-white"
            >
              {tag.tag}
            </p>
          ))}
        </div>
      </div>
      <div className="border-b" />
      <div className="flex flex-col py-3 pl-3">
        {posting.comments.map((comment) => (
          <PostingComments
            key={comment.id}
            comment={comment}
            refetch={refetch}
          />
        ))}
      </div>
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
      {isModal && <PostingModal clickClose={clickModalBtn}/>}
    </div>
  )
}
