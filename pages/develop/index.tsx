import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { PostingType } from '../../src/interface'
import { MarkdownPosting } from '../../components/Develop/DevelopList/MardownPosting'

const GETMARKDOWN = gql`
  query allMarkdown {
    allMarkdown {
      id
      title
      text
      created
      author {
        nickname
      }
      comments {
        id
      }
    }
  }
`
export default function DevelopList() {
  const { data, loading, refetch } = useQuery(GETMARKDOWN)

  useEffect(() => {
    refetch()
  }, [data])

  return (
    <div className="h-full w-full md-m:px-2 py-3 md:px-[13%] sm:py-10">
      <div className="mx-auto flex flex-col">
        {!loading &&
          data?.allMarkdown.map((item: PostingType) => (
            <MarkdownPosting key={item.id} posting={item} />
          ))}
      </div>
    </div>
  )
}
