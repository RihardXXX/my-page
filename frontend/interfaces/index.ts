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

export interface ICardValidForm {
  type: 'cardAboutMe' | '',
  title: string | '',
  welcome: string | '',
  description: string | '',
  buttonName: string | '',
}

export interface ICardBase {
  buttonName: string
  createdAt: string
  updatedAt: string
  description: string
  title: string
  type: 'cardAboutMe' | ''
  welcome: string
  __typename: 'CardForSection'
  _id: string
}
