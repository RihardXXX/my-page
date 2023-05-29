import gql from 'graphql-tag'

export const GET_MENU_HEADER = gql`
  query GetMenuHeader {
    getMenuHeader {
      _id
      name
      nameSection
      type
    }
  }
`

export const GET_CARD_ABOUT_ME = gql`
  query GetCardAboutMe {
    getCardAboutMe {
      _id
      type
      title
      welcome
      buttonName
      description
      createdAt
      updatedAt
    }
  }
`
