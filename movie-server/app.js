'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const movie = require('./route');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/movie', movie);

const port = process.env.PORT || 3001;
app.listen(port, console.log(`movie server running on port ${port}`));