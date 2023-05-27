import gql from 'graphql-tag'

// Внимание в variables указываем имена с долларом которые но без доллара

export const CREATE_NAV_ITEM = gql`
  mutation CreateNavItem($name: String!, $nameSection: String!, $type: String!) {
    createNavItem(name: $name, nameSection: $nameSection, type: $type) {
      name,
      nameSection,
      type,
      _id
    }
  }
`

export const DELETE_NAV_ITEM = gql`
  mutation DeleteNavItem($deleteNavItemId: ID!) {
    deleteNavItem(id: $deleteNavItemId)
  }
`

export const UPDATE_NAV_ITEM = gql`
  mutation UpdateNavItem($updateNavItemId: ID!, $fields: NavItemField) {
    updateNavItem(id: $updateNavItemId, fields: $fields) {
      _id
      nameSection
      nameSection
      type
    }
  }
`

export const DELETE_ALL_NAV_ITEM = gql`
  mutation Mutation {
    deleteAllNavItem
  }
`
