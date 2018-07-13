const express = require('express');
const bodyParser = require('body-parser');
const responseTime = require('response-time');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const movie = require('./api/movie');
const tvSeries = require('./api/tvSeries');
const entertainme = require('./api/entertainme');
const graphQLobj =  require('./api/graphql');

const app = express();

app.use(cors());


const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
app.use(jsonParser)
app.use('/graphql', graphqlHTTP({
  schema: graphQLobj.schema,
  rootValue: graphQLobj.root,
  graphiql: true,
}))
app.use(responseTime());

app.use('/movie', movie);
app.use('/tvseries', tvSeries);
app.use('/entertainme', entertainme);

app.listen(3000);
