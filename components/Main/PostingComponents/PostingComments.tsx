import {
  ApolloQueryResult,
  gql,
  OperationVariables,
  useMutation,
  useQuery,
} from '@apollo/client'
import { useCallback, useState } from 'react'
import { CommentType } from '../../../src/interface'
import { DeleteModal } from '../../Aside/Modal/DeleteModal'
import { ModifyModal } from '../../Aside/Modal/ModifyModal'
import DeleteAndModifyBtn from '../../Public/DeleteAndModifyBtn'
import { CURRENTUSER } from '../../../src/gql/currentUser'

interface Props {
  comment: CommentType
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

const DELETE = gql`
  mutation deletePostingComment($id: Int!) {
    deletePostingComment(id: $id) {
      id
    }
  }
`

const Modify = gql`
  mutation modifyPostingComment($id: Int!, $text: String!) {
    modifyPostingComment(id: $id, text: $text) {
      id
      text
    }
  }
`

export default function PostingComments({ comment, refetch }: Props) {
  const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false)
  const [isModifyComment, setIsModifyComment] = useState<boolean>(false)
  const [modifyText, setModifyText] = useState<string>('')

  const [deleteMutation] = useMutation(DELETE)
  const [modifyMutation] = useMutation(Modify)
  const { data } = useQuery(CURRENTUSER)

  const clickDelete = useCallback(() => {
    setIsDeleteComment((prev) => !prev)
  }, [])

  const clickModify = useCallback(() => {
    setIsModifyComment((prev) => !prev)
    setModifyText('')
  }, [])

  const clickConfirmDelete = useCallback(async () => {
    await deleteMutation({
      variables: { id: comment.id },
    })
    alert('삭제되었습니다.')
    refetch()
  }, [])

  const clickConfirmModify = useCallback(async () => {
    await modifyMutation({
      variables: {
        id: comment.id,
        text: modifyText,
      },
    })
    alert('수정되었습니다.')
    clickModify()
  }, [modifyText])

  return (
    <div key={comment.id} className="flex w-full space-x-3">
      <p className="break-keep font-semibold">{comment.writer.nickname}</p>
      <div className="flex w-full items-end justify-between pr-2">
        <p className="text-gray-700">{comment.text}</p>
        {comment.writer.nickname === data?.currentUser?.nickname && (
          <DeleteAndModifyBtn
            clickModify={clickModify}
            clickDelete={clickDelete}
          />
        )}
      </div>
      {isDeleteComment && (
        <DeleteModal
          message="댓글"
          clickClose={clickDelete}
          clickConfirm={clickConfirmDelete}
        />
      )}
      {isModifyComment && (
        <ModifyModal
          value={modifyText}
          setFunction={setModifyText}
          message="댓글"
          clickClose={clickModify}
          clickConfirm={clickConfirmModify}
        />
      )}
    </div>
  )
}
