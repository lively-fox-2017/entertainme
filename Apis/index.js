const express = require('express');
const bodyParser = require('body-parser');
const movie = require('./api/movie');
const tvSeries = require('./api/tvSeries');
const entertainme = require('./api/entertainme');

const app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use('/movie', movie);
app.use('/tvseries', tvSeries);
app.use('/entertainme', entertainme);

app.listen(3000);
