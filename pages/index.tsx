import { gql, useQuery } from '@apollo/client'
import { useCallback, useState } from 'react'
import Posting from '../components/Main/Posting'
import { PostingType } from '../src/interface'
import AddPost from '../components/Main/AddPost'
import { PlusMark } from '../components/svg/PlusMark'

const GETPOSTING = gql`
  query AllPosting {
    AllPosting {
      id
      created
      title
      text
      img {
        id
        location
      }
      text
      tag {
        id
        tag
      }
      author {
        id
        nickname
      }
      comments {
        id
        text
        writer {
          nickname
        }
      }
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

export default function Main() {
  const [isPosting, setIsPosting] = useState<boolean>(false)

  const clickAddPost = useCallback(() => {
    setIsPosting((prev) => !prev)
  }, [])
  const { data, loading, refetch } = useQuery(GETPOSTING)
  const currentUser = useQuery(CURRENTUSER)

  return (
    <div>
      <div className="flex flex-col items-center">
        {!loading &&
          data?.AllPosting.map((posting: PostingType) => (
            <Posting key={posting.id} posting={posting} refetch={refetch} />
          ))}
      </div>
      {isPosting && <AddPost setIsPosting={setIsPosting} refetch={refetch} />}
      {currentUser?.data?.currentUser?.role === 'creator' && (
        <button
          className="fixed bottom-10 right-[10%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-origin md-m:bottom-24"
          onClick={clickAddPost}
        >
          <PlusMark />
        </button>
      )}
    </div>
  )
}
