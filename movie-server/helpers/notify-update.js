'use strict'

const axios = require('axios');

module.exports = async () => {
  try {
    const response = await axios.get('http://localhost:3000/thereisupdatedude');
  } catch (err) {
    throw err;
  }
}