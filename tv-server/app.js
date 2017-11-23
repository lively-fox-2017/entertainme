'use strict'

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const tv = require('./route');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/tv', tv);

const port = process.env.PORT || 3002;
app.listen(port, console.log(`tv server running on port ${port}`));