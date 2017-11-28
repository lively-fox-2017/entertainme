const app = require('express')();
const cors = require('cors');
var axios = require('axios');
const bodyParser = require('body-parser');
const graphQLHTTP = require('express-graphql');
const {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLSchema,
} = require('graphql');

// cors and bodyParser, as usual, for later use
app.use(cors());
app.use(bodyParser.json());

// let's define the type for School using GraphQLObjectType
// GraphQLObjectType usually consists of name and fields.
const SeriesType = new GraphQLObjectType({
    name: 'Series',
    fields: {
      _id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      popularity: {
        type: GraphQLInt,
      },
      overview: {
        type: GraphQLString,
      },
      poster_path: {
        type: GraphQLString
      }
    },
});

// type for single Student
const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    popularity: {
      type: GraphQLInt,
    },
    overview: {
      type: GraphQLString,
    },
    poster_path: {
      type: GraphQLString
    }
  },
});

// now let's create an appQuery to contain all fields, school and students
// each field resolves to a value from the fakeData
const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    series: {
      type: new GraphQLList(SeriesType),
      resolve: (root) => new Promise((resolve, reject) => {
        axios.get('http://localhost:3002')
        .then(({data}) => {
            resolve(data.data)
        })
      }),
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (root) => new Promise((resolve, reject) => {
        axios.get('http://localhost:3001')
        .then(({data}) => {
            resolve(data.data)
        })
      }),
    },
  },
});

const appSchema = new GraphQLSchema({
  query: QueryType,
//   mutation: MutationType,
});

app.use('/graphql', graphQLHTTP({
  schema: appSchema,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('Welcome!!! use /graphql to visit graphiql :D');
});

app.listen(4000, () => {
  console.log('welcome to the api');
});