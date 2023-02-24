import { ApolloQueryResult, gql, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

const WRITECOMMENT = gql`
  mutation addMarkdownComment($text: String!, $markdownId: Int!) {
    addMarkdownComment(text: $text, markdownId: $markdownId) {
      id
      text
      writer{
        nickname
      }
    }
  }
`

interface Props {
  refetch: (
    variables?:
      | Partial<{
          id: number
        }>
      | undefined
  ) => Promise<ApolloQueryResult<any>>
}

export default function DevelopCommentForm({ refetch }: Props) {
  const [commentText, setCommentText] = useState('')

  const router = useRouter();

  const [writeMutation] = useMutation(WRITECOMMENT, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })
  const inputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value)
  }

  const submitCommentForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await writeMutation({
      variables: {
        text: commentText,
        markdownId: parseInt(router.query.id as string),
      },
    })
    setCommentText('')
    refetch()
  }

  return (
    <form
      onSubmit={submitCommentForm}
      className="flex flex-col items-end space-y-3"
    >
      <input
        onChange={inputText}
        value={commentText}
        className="w-full rounded-md border bg-gray-300 py-3 px-3 shadow-sm focus:outline-none"
        placeholder="댓글을 입력하세요"
      />
      <button className="rounded-md border bg-origin px-3 py-2 text-white shadow-md">
        댓글 작성
      </button>
    </form>
  )
}
