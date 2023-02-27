import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
  useQuery,
} from '@apollo/client'
import { useCallback, useState } from 'react'
import { changeTimeFormatFunction } from '../../src/function/changeTimeFormatFunction'
import { PostingType } from '../../src/interface'
import SwiperComponents from '../Public/SwiperComponents'
import { MoreMark } from '../svg/MoreMark'
import { PostingModal } from './PostingComponents/PostingModal'
import { CURRENTUSER } from '../../src/gql/currentUser'
import { DeleteModal } from '../Aside/Modal/DeleteModal'
import { PostingCommentForm } from './PostingComponents/PostingCommentForm'
import PostingComments from './PostingComponents/PostingComments'

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

const DELETEPOSTING = gql`
  mutation deletePosting($id: Int!) {
    deletePosting(id: $id) {
      id
    }
  }
`

export default function Posting({ posting, refetch }: Props) {
  const [comment, setComment] = useState('')
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [isModify, setIsModify] = useState<boolean>(false)
  const { data } = useQuery(CURRENTUSER)
  const [addComment] = useMutation(ADDCOMMENT)

  const [deletePosting, { data: deleteData }] = useMutation(DELETEPOSTING, {
    variables: {
      id: posting.id,
    },
  })

  const clickDelete = async () => {
    await deletePosting()
    alert('삭제되었습니다.')
    refetch()
  }

  const time = changeTimeFormatFunction(posting.created)

  const inputComment = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }, [])

  const submitComment = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await addComment({
        variables: {
          text: comment,
          postingId: posting.id,
        },
      })
      setComment('')
      refetch()
    },
    [comment]
  )

  const clickModalBtn = useCallback(() => {
    setIsModal((prev) => !prev)
  }, [])

  return (
    <div className="my-5 w-[450px] rounded-md border sm-m:max-w-[300px]">
      <div className="flex flex-col justify-center space-y-3 py-2 pl-3">
        <div className="flex justify-between pt-1 pr-2">
          <p>{posting.author.nickname}</p>
          {posting?.author?.nickname === data?.currentUser?.nickname && (
            <button onClick={clickModalBtn} className="pr-2">
              <MoreMark />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <div className="min-w-[100px] max-w-[450px] sm-m:max-h-[300px] sm-m:max-w-[300px]">
        {posting.img && <SwiperComponents img={posting.img} />}
      </div>
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
      <PostingCommentForm
        submitComment={submitComment}
        inputComment={inputComment}
        comment={comment}
      />
      {isModal && (
        <PostingModal
          clickClose={clickModalBtn}
          setIsDelete={setIsDelete}
          setIsModify={setIsModify}
        />
      )}
      {isDelete && (
        <DeleteModal
          message="게시글"
          clickClose={() => setIsDelete((prev) => !prev)}
          clickConfirm={clickDelete}
        />
      )}
    </div>
  )
}
