const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        me: User
    }

    type User { 
        _id: ID
        username: String
        email: String
        password: String
        savedMoods: [Mood]

    }

    // type Book {
    //     bookId: String
    //     authors: [String]
    //     description: String
    //     image: String
    //     link: String
    //     title: String
    // }

    type Auth {
        token: ID!
        user: User
    }

    // input BookInput {
    //     bookId: String
    //     authors: [String]
    //     description: String
    //     image: String
    //     link: String
    //     title: String
    // }

    // type Mutation {
    //     login(email: String!, password: String!): Auth
    //     addUser(username: String!, email: String!, password: String!): Auth
    //     saveBook(input: BookInput): User
    //     removeBook(bookId: String!): User
    // }
`;

module.exports = typeDefs;