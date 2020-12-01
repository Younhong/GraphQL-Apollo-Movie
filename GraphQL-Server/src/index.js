import resolvers from './graphql/resolvers';
import { GraphQLServer } from 'graphql-yoga'; 

const server = new GraphQLServer({
    typeDefs: 
    // "graphql/schema.graphql",
    `type Movie {
        id: Int!
        title: String!
        rating: Float
        description_intro: String
        language: String
        medium_cover_image: String
        genres: [String]
      }
      
      type Query {
        movies(limit: Int, rating: Float): [Movie]!
        movie(id: Int!): Movie
        suggestions(id: Int!): [Movie]!
      }
      `,
      resolvers
});

server.start(() => console.log("Graphql Server Running"));