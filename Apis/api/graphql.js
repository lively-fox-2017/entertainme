const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  buildSchema
} =  require('graphql');
const axios = require('axios');

// module.exports =  schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return 'world'
//         }
//       },
//       world: {
//         type: GraphQLString,
//         resolve() {
//           return 'tuturu'
//         }
//       },
//       movies: {
//         type: GraphQLString,
//         resolve: async() => {
//           const { data } = await axios.get('http://localhost:3001/movie')
//           return JSON.stringify(data);
//         }
//       },
//       tvSeries: {
//         type:
//           new GraphQLObjectType({
//             name: 'asd',
//             fields: {
//               id: {
//                 type: GraphQLString,
//                 resolve() {
//                   return 'asd'
//                 }
//               }
//             }
//           })
//
//       }
//     }
//   })
// })

module.exports = {
  schema: buildSchema(`
    type Query {
      movies: [Movie]
      tvSeries: [TvSerie]
    }

    type Mutation {
      updateMovie(movie: MovieInput): Movie
    }

    input MovieInput {
      id: String
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tag: [String]
      status: String
    }

    type Movie {
      id: String
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tag: [String]
      status: String
    }

    type TvSerie {
      id: String
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tag: [String]
      status: String
    }
  `),
  root: {
    updateMovie: async({ movie }) => {
      const params = {};
      movie.title && (params.title = movie.title);
      movie.overview && (params.overview = movie.overview);
      movie.poster_path && (params.poster_pamovie.body.poster_path);
      movie.popularity && (params.popularity = movie.popularity);
      movie.tag && (params.tag = movie.tag);
      movie.status && (params.status = movie.status);
      // console.log(movie.id);
      // console.log(params);
      const { data } = await axios.put(`http://localhost:3001/movie/${movie.id}`, params)
      // console.log(data);
      return data;
    },
    movies: async() => {
      const { data } = await axios.get('http://localhost:3001/movie');
      // console.log(data);
      return data.map((item) => ({
        id: item._id,
        title: item.title,
        overview: item.overview,
        poster_path: item.poster_path,
        popularity: item.popularity,
        tag: item.tag,
        status: item.status,
      }));
    },
    tvSeries: async() => {
      const { data } = await axios.get('http://localhost:3002/tvseries');
      // console.log(data);
      return data.map((item) => ({
        id: item._id,
        title: item.title,
        overview: item.overview,
        poster_path: item.poster_path,
        popularity: item.popularity,
        tag: item.tag,
        status: item.status,
      }));
    },
  }
}
