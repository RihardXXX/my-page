const gql = require('graphql-tag');

// описанная схема
const typeDefs = gql`
    scalar DateTime
    type Xxx{
        name: String!
    }
    type NavItem {
        _id: ID!
        name: String!
        nameSection: String!
        type: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    },
    type CardForSection {
        _id: ID!
        type: String!
        title: String!
        welcome: String!
        buttonName: String!
        description: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    },
#    type User {
#        id: ID!
#        username: String!
#        email: String!
#        avatar: String
#        favorites: [Advert!]
#        adverts: [Advert!]!
#        confirmed: Boolean!
#    },
#    type Advert {
#        _id: ID!
#        author: User!
#        name: String!
#        category: [String]!
#        content: String!
#        contact: String
#        favoriteCount: Int!
#        favoritedBy: [User!]
#        watch: Int!
#        createdAt: DateTime!
#        updatedAt: DateTime!
#        comments: [Comment]!
#    },
#    type Comment {
#        _id: ID!
#        author: User!
#        advert: Advert!
#        content: String!
#        createdAt: DateTime!
#        updatedAt: DateTime!
#    },
#    type AdvertFeed {
#        adverts: [Advert]!
#        totalAdverts: Int!
#        hasNextPage: Boolean!
#        nextPage: Int
#        offset: Int!
#        limit: Int!
#        page: Int!
#    },
#    type CommentFeed {
#        comments: [Comment]!
#        totalComments: Int
#        hasNextPage: Boolean!
#        nextPage: Int
#        offset: Int!
#        limit: Int!
#        page: Int!
#    }
#    type BaseUserRes {
#        _id: ID!
#        username: String!
#        email: String!
#        avatar: String!
#        createdAt: DateTime!
#        updatedAt: String!
#        confirmed: Boolean!
#    }
#    type ResponseSignIn {
#        token: String!
#        user: BaseUserRes!
#    }
#    input Advertfield {
#        name: String
#        category: [String]
#        content: String
#        contact: String
#    },
    input NavItemField {
        name: String
        nameSection: String
        type: String
    }
    input CardForSectionField {
        type: String!
        title: String!
        welcome: String!
        buttonName: String!
        description: String!
    }
    type Query {
        test: Xxx!
        getMenuHeader: [NavItem]!
        getCardAboutMe: [CardForSection]!
#        advert(id: String!): Advert!
#        advertFeed(offset: Int!, limit: Int!): AdvertFeed
#        advertFeedFavorite(offset: Int!, limit: Int!): AdvertFeed
#        advertFeedMy(offset: Int!, limit: Int!): AdvertFeed
#        user(username: String!): User
#        userForId(id: ID!): User
#        users: [User!]!
#        me: BaseUserRes
#        comment(id: ID!): Comment!
#        commentFeed(offset: Int!, limit: Int!, idAdvert: ID!): CommentFeed
#        testMailer(email: String!, message: String!): Boolean!
    },
    type Mutation {
        createNavItem(name: String!, nameSection: String!, type: String!): NavItem!
        deleteNavItem(id: ID!): Boolean
        updateNavItem(id: ID!, fields: NavItemField): NavItem!
        deleteAllNavItem: Boolean
        createCardForSection(fields: CardForSectionField): CardForSection!
#        newAdvert(name: String!, content: String!, category: [String!]!, contact: String): Advert!
#        updateAdvert(id: ID!, fields: Advertfield): Advert!
        test(id: String!): String!
#        signUp(username: String!, email: String!, password: String!): ResponseSignIn!
#        signIn(email: String!, password: String!): ResponseSignIn!
#        toggleFavorite(id: String!): Advert!
#        newComment(content: String!, idAdvert: ID!): Comment!
#        updateComment(id: ID!, content: String!): Comment!
#        deleteComment(id: ID!): Boolean
#        vkAuth(login: String!): String!
#        requestLinkForPassword(email: String!): Boolean!
    },
`

module.exports = typeDefs;
