import {
  useMutation,
  gql,
  ApolloQueryResult,
  OperationVariables,
} from '@apollo/client'
import { useState } from 'react'
import { TagForm } from './TagForm'

const ADDPOST = gql`
  mutation addPosting(
    $title: String!
    $text: String!
    $img: [Upload]
    $tag: [String]
  ) {
    addPosting(title: $title, text: $text, img: $img, tag: $tag) {
      id
      text
      title
      user_id
      tag {
        id
        tag
      }
      img {
        id
        location
      }
    }
  }
`

interface Props {
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>
}

export default function AddPost({ setIsPosting, refetch }: Props) {
  const [contents, setContents] = useState({
    title: '',
    text: '',
  })
  const [img, setImg] = useState<any>([])
  const [tagList, setTagList] = useState<string[]>([])
  const [tag, setTag] = useState<string>('')
  const [addPosting, { data }] = useMutation(ADDPOST, {
    context: {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    },
  })
  const inputContents = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setContents({
      ...contents,
      [name]: value,
    })
  }

  const clickPost = async () => {
    if (contents.text !== '' && contents.title !== '') {
      await addPosting({
        variables: {
          title: contents.title,
          text: contents.text,
          tag: tagList,
          img,
        },
      })
      alert('게시글이 작성되었습니다.')
      refetch()
      closeModal()
    } else {
      alert('내용을 입력해주세요')
    }
  }

  const closeModal = () => {
    setIsPosting((prev) => !prev)
    setContents({
      title: '',
      text: '',
    })
  }
  const inputTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  }

  const submitTagForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (tagList.includes(tag)) {
      alert('이미 포함된 태그입니다.')
      setTag('')
    } else {
      setTagList([...tagList, tag])
      setTag('')
    }
  }

  const deleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTagList(tagList.filter((tag) => tag !== e.currentTarget.value))
  }

  const selectImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileArr = Object.values(e.target.files as any)
    let file
    let newArr: any = []
    for (let i in fileArr) {
      file = fileArr[i]
      const reader = new FileReader()
      reader.readAsDataURL(file as any)
      reader.onloadend = (finishedEvent) => {
        const { currentTarget } = finishedEvent
        newArr[i] = (currentTarget as any).result
        setImg([...newArr])
      }
    }
  }

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black/50">
      <div className="absolute top-[40%] left-[50%] flex w-[450px] max-w-[450px] translate-x-[-50%] translate-y-[-50%]  flex-col space-y-3 rounded-md border bg-white py-7 px-5">
        <div className="pb-3 text-center font-semibold text-gray-700">
          게시글 작성
        </div>
        <input
          onChange={inputContents}
          name="title"
          value={contents.title}
          placeholder="제목을 입력하세요"
          className="border-b py-1 pl-2 focus:outline-none"
        />
        <TagForm
          deleteTag={deleteTag}
          inputTag={inputTag}
          tag={tag}
          submitTagForm={submitTagForm}
          tagList={tagList}
        />
        <input
          type="file"
          multiple={true}
          onChange={selectImg}
          accept="image/*"
        />
        <textarea
          onChange={inputContents}
          name="text"
          value={contents.text}
          placeholder="내용을 입력하세요"
          className="h-40 resize-none border py-1 pl-2 focus:outline-none"
        />
        <div className="flex space-x-3">
          <button onClick={clickPost}>게시글 작성</button>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    </div>
  )
}
