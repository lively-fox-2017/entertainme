const express = require('express');
var bodyParser = require('body-parser');
const controller = require('./controller');

const app = express();
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser);

app.use('/movie', controller);

app.get('/movie', (req, res) => {
  res.send('hello world');
})

app.listen(3001);
