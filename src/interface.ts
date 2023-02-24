export interface SignUpInfo {
  email: string
  password: string
  nickname: string
  user_name: string
}

export interface PostingType {
  author: {
    id: number
    nickname: string
  }
  created: string
  id: number
  title: string
  tag: {
    id: number
    tag: string
  }[]
  text: string
  img: {
    id: number
    location: string
  }[]
  comments: CommentType[]
}

export interface CommentType {
  id: number
  text: string
  writer: {
    nickname: string
  }
}

export interface Contents {
  title: string
  text: string
}

export interface GuestBookType {
  id: number
  text: string
  created: string
  writer: {
    id: number
    nickname: string
    thumbnail_url: string
  }
}

export interface User {
  email: string
  nickname: string
  thumbnail_url: string
  Comment: CommentType[]
  GuestBook: GuestBookType[]
  MarkdownComment: CommentType[]
  posts: PostingType[]
  markdown: PostingType[]
}
