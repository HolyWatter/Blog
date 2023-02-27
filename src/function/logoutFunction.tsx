import { ApolloClient, DocumentNode } from '@apollo/client'

export const logoutFunction = (
  client: ApolloClient<object>,
  queryName: DocumentNode
) => {
  localStorage.removeItem('token')
  alert('로그아웃되었습니다.')
  client.writeQuery({
    query: queryName,
    data: {
      currentUser: null,
    },
  })
}
