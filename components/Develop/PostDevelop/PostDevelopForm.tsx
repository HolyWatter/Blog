import React, { useCallback, useState } from 'react'
import { fileToBase64 } from '../../../src/function/fileToBase64'
import { pressEnter, pressTab } from '../../../src/function/pressTabAndEnter'
import { Contents } from '../../../src/interface'
import ImgUploadSwiper from '../../Public/ImgUploadSwiper'
import { DevelopTagForm } from './DevelopTagForm'

interface Props {
  contents: Contents
  setContents: React.Dispatch<React.SetStateAction<Contents>>
  setTagList: React.Dispatch<React.SetStateAction<string[]>>
  tagList: string[]
  setImg: React.Dispatch<any>
  img: any
}

export const PostDevelopForm = ({
  contents,
  setContents,
  setImg,
  setTagList,
  tagList,
  img,
}: Props) => {
  const [tag, setTag] = useState<string>('')
  const deleteTag = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTagList(tagList.filter((tag: string) => tag !== e.currentTarget.value))
    },
    [tagList]
  )

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
    [tagList]
  )

  const selectImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileArr = Object.values(e.target.files as any)
      fileToBase64(fileArr, setImg)
    },
    []
  )
  
  return (
    <div>
      <input
        onChange={inputContents}
        className="w-full border-b-4 border-origin bg-bg pl-3 pb-2 text-3xl focus:outline-none"
        placeholder="제목을 입력하세요"
        name="title"
        value={contents.title}
      />
      <DevelopTagForm
        bg="bg-bg"
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
        className="w-full"
        accept="image/*"
      />
      {<ImgUploadSwiper img={img} />}
      <textarea
        onKeyDown={(e) => {
          pressEnter(e)
          pressTab(e)
        }}
        onChange={inputContents}
        name="text"
        value={contents.text}
        placeholder="오늘 공부한 내용을 적어보세요..."
        className="mt-4 min-h-[350px] w-full resize-none bg-bg pl-3 focus:outline-none"
      />
    </div>
  )
}
