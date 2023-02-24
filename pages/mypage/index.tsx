import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import Log from '../../components/MyPage/Log'
import { ModifyProfile } from '../../components/MyPage/ModifyProfile'
import { UserInfo } from '../../components/MyPage/UserInfo'

const MYPAGE = gql`
  query myPage {
    myPage {
      id
      user_name
      thumbnail_url
      email
      password
      nickname
      role
      GuestBook {
        id
        text
        created
      }
      Comment {
        id
        text
      }
      MarkdownComment {
        id
        text
      }
      posts {
        id
      }
      markdown {
        id
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

export default function Mypage() {
  const [isModifyProfile, setIsModifyProfile] = useState<boolean>(false)
  const router = useRouter()
  const { data, loading, refetch } = useQuery(MYPAGE)
  const {data : currentUser} = useQuery(CURRENTUSER)

  useEffect(() => {
    refetch()
  }, [currentUser])

  console.log(currentUser)
  useEffect(() => {
    if (!currentUser.currentUser) {
      alert('로그인이 필요합니다.')
      router.push('/')
    }
  }, [currentUser])

  useEffect(() => {
    if (isModifyProfile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isModifyProfile])

  return (
    <div className="mx-auto mt-10 max-w-[700px] px-10">
      {!loading && data && (
        <UserInfo
          userInfo={data?.myPage}
          setIsModifyProfile={setIsModifyProfile}
          refetch={refetch}
        />
      )}
      {!loading && data && <Log userInfo={data.myPage} />}
      {isModifyProfile && (
        <ModifyProfile
          refetch={refetch}
          setIsModifyProfile={setIsModifyProfile}
          userInfo={data.myPage}
        />
      )}
    </div>
  )
}
