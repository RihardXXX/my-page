import gql from 'graphql-tag'

export const CREATE_NAV_ITEM = gql`
  mutation CreateNavItem($name: String!, $nameSection: String!, $type: String!) {
    createNavItem(name: $name, nameSection: $nameSection, type: $type) {
      name
    }
  }
`
