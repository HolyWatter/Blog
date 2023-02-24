import React, { useState } from 'react'
import { Contents } from '../../../src/interface'
import ImgUploadSwiper from '../../Public/ImgUploadSwiper'
import DevelopTagForm from './DevelopTagForm'

interface Props {
  contents: Contents
  setContents: React.Dispatch<React.SetStateAction<Contents>>
  setTagList: React.Dispatch<React.SetStateAction<string[]>>
  tagList: string[]
  setImg: React.Dispatch<any>
  img: any
}

export default function PostDevelopForm({
  contents,
  setContents,
  setImg,
  setTagList,
  tagList,
  img,
}: Props) {
  const [tag, setTag] = useState<string>('')
  const pressTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const start: number | null = e.currentTarget.selectionStart
      const end: number | null = e.currentTarget.selectionEnd
      const value = e.currentTarget.value
      e.currentTarget.value =
        value.substring(0, start!) + '\t' + value.substring(end!)
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start! + 1
      return false
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      const start: number | null = e.currentTarget.selectionStart
      const end: number | null = e.currentTarget.selectionEnd
      const value = e.currentTarget.value
      e.currentTarget.value =
        value.substring(0, start!) + '\n' + value.substring(end!)
      e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start! + 1
      return false
    }
  }

  const deleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTagList(tagList.filter((tag: string) => tag !== e.currentTarget.value))
  }

  const inputContents = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setContents({
      ...contents,
      [name]: value,
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
    <div>
      <input
        onChange={inputContents}
        className="w-full border-b-4 border-origin bg-bg pl-3 pb-2 text-3xl focus:outline-none"
        placeholder="제목을 입력하세요"
        name="title"
        value={contents.title}
      />
      <DevelopTagForm
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
        onKeyDown={pressTabKey}
        onChange={inputContents}
        name="text"
        value={contents.text}
        placeholder="오늘 공부한 내용을 적어보세요..."
        className="mt-4 min-h-[350px] w-full resize-none bg-bg pl-3 focus:outline-none"
      />
    </div>
  )
}
