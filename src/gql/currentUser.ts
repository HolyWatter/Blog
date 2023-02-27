import { gql } from '@apollo/client'

export const CURRENTUSER = gql`
  query currentUser {
    currentUser {
      nickname
      email
      role
      thumbnail_url
    }
  }
`
