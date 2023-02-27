import {
  useMutation,
  gql,
  ApolloQueryResult,
  OperationVariables,
} from '@apollo/client'
import { useCallback, useState } from 'react'
import { fileToBase64 } from '../../src/function/fileToBase64'
import { DevelopTagForm } from '../Develop/PostDevelop/DevelopTagForm'
import { BlueBtnWhite } from '../Public/Button/BlueBtnWhite'
import { GrayBtnWhite } from '../Public/Button/GrayBtnWhite'
import { ModalBg } from '../Public/Button/Modal/ModalBg'

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
  const [addPosting] = useMutation(ADDPOST)

  const inputContents = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setContents({
        ...contents,
        [name]: value,
      })
    },
    [contents]
  )

  const clickPost = useCallback(async () => {
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
  }, [contents, tagList, img])

  const closeModal = useCallback(() => {
    setIsPosting((prev) => !prev)
    setContents({
      title: '',
      text: '',
    })
  }, [])
  const inputTag = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value)
  }, [])
  const submitTagForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (tagList.includes(tag)) {
        alert('이미 포함된 태그입니다.')
        setTag('')
      } else {
        setTagList([...tagList, tag])
        setTag('')
      }
    },
    [tagList, tag]
  )

  const deleteTag = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTagList(tagList.filter((tag) => tag !== e.currentTarget.value))
    },
    [tagList]
  )

  const selectImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileArr = Object.values(e.target.files as FileList)
      fileToBase64(fileArr, setImg)
    },
    []
  )

  return (
    <ModalBg>
      <div className="absolute top-[40%] left-[50%] flex w-[450px] max-w-[450px] translate-x-[-50%] translate-y-[-50%]  flex-col space-y-3 rounded-md border bg-white py-7 px-5 sm-m:max-w-[330px]">
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
        <DevelopTagForm
          bg="bg-white"
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
        <div className="flex space-x-3 justify-end">
          <GrayBtnWhite onClick={closeModal}>닫기</GrayBtnWhite>
          <BlueBtnWhite onClick={clickPost}>게시글 작성</BlueBtnWhite>
        </div>
      </div>
    </ModalBg>
  )
}
