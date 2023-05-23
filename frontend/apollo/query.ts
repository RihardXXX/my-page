import gql from 'graphql-tag'

export const GET_MENU_HEADER = gql`
  query GetMenuHeader {
    getMenuHeader {
      name
      nameSection
      type
      _id
    }
  }
`
