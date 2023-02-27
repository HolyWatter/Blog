import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Markdown } from '../../components/Aside/Markdown/Markdown'
import { gql, useMutation, useQuery } from '@apollo/client'
import { PostDevelopForm } from '../../components/Develop/PostDevelop/PostDevelopForm'
import { BackMark } from '../../components/svg/BackMark'
import { WhiteBtnOrigin } from '../../components/Public/Button/WhiteBtnOrigin'
import { moveBtnFunction } from '../../src/function/moveBtnFunction'

const ADDMARKDOWN = gql`
  mutation addMarkdown(
    $title: String!
    $text: String!
    $tag: [String]
    $img: [Upload]
  ) {
    addMarkdown(title: $title, text: $text, tag: $tag, img: $img) {
      id
      text
      title
      created
      user_id
      MarkdownImg {
        id
        location
      }
      MarkdownTag {
        id
        tag
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
export default function PostDevelop() {
  const [tagList, setTagList] = useState<string[]>([])
  const [contents, setContents] = useState({
    title: '',
    text: '',
  })
  const [img, setImg] = useState<any>([])
  const router = useRouter()
  const { data: currentUser, loading } = useQuery(CURRENTUSER)
  const [addMarkdown, { data }] = useMutation(ADDMARKDOWN)

  useEffect(() => {
    if (
      (!loading && currentUser?.currentUser?.role !== 'creator') ||
      currentUser === undefined
    ) {
      alert('권한이 없습니다.')
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if (data) {
      alert('작성되었습니다.')
      router.push(`/develop/${data.addMarkdown.id}`)
    }
  }, [data])

  const submitPost = useCallback(async () => {
    await addMarkdown({
      variables: {
        title: contents.title,
        text: contents.text,
        tag: tagList,
        img,
      },
    })
  }, [contents, tagList, img])

  return (
    <div className="h-full w-full py-10 md:pr-10">
      <div className="h-full w-full space-y-3 xl:inline-block xl:w-[40%]">
        <PostDevelopForm
          contents={contents}
          setContents={setContents}
          setImg={setImg}
          setTagList={setTagList}
          tagList={tagList}
          img={img}
        />
        <div className="fixed bottom-0 left-0 z-10 flex h-20 w-full items-center justify-between border-t bg-origin px-5">
          <button
            value="/develop"
            onClick={(e) => moveBtnFunction(e, router.push)}
            className="flex items-center space-x-3 text-xl text-white"
          >
            <BackMark />
            <p>나가기</p>
          </button>
          <WhiteBtnOrigin onClick={submitPost}>글쓰기</WhiteBtnOrigin>
        </div>
      </div>
      <div className="mt-10 break-words align-top xl-m:hidden xl:ml-10 xl:inline-block xl:w-[40%]">
        <Markdown markdown={contents.text} />
      </div>
    </div>
  )
}
