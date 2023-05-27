export interface INavItemValidForm {
  type: string | '',
  name: string | '',
  nameSection: string | ''
}
export interface INavItem {
  __typename: string,
  name: string,
  nameSection: string,
  type: string,
  _id: string
}
