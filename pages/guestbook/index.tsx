import { gql, useMutation, useQuery } from '@apollo/client'
import GuestBookItem from '../../components/GuestBook/GuestBookItem'
import { GuestBookType } from '../../src/interface'
import React, { useCallback, useState } from 'react'
import { GuestBookForm } from '../../components/GuestBook/GuestBookForm'

const ALLGUESHBOOK = gql`
  query allGuestBook {
    allGuestBook {
      id
      text
      created
      writer {
        id
        nickname
        thumbnail_url
      }
    }
  }
`

const WRITEGUESTBOOK = gql`
  mutation writeGuestBook($text: String!) {
    writeGuestBook(text: $text) {
      id
      text
    }
  }
`

export default function Guestbook() {
  const [text, setText] = useState<string>('')
  const { data, refetch } = useQuery(ALLGUESHBOOK)
  const [writeMutation] = useMutation(WRITEGUESTBOOK)

  const inputText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }, [])

  const submitGuestBook = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      await writeMutation({
        variables: {
          text,
        },
      })
      setText('')
      refetch()
    },
    [text]
  )

  return (
    <div className="mx-auto max-w-[700px]">
      <GuestBookForm
        submitGuestBook={submitGuestBook}
        inputText={inputText}
        text={text}
      />
      <div className="my-10 w-[95%]">
        {data?.allGuestBook.map((item: GuestBookType) => (
          <GuestBookItem key={item.id} item={item} refetch={refetch} />
        ))}
      </div>
    </div>
  )
}
