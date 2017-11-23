require('dotenv').config();
const axios = require('axios');
const orchestratorUri = process.env.ORCHESTRATOR_URI;

module.exports = {
  flushCache: () => {
    axios
      .post(orchestratorUri + '/flush-cache')
      .then(() => {
        console.log('Redis cache flushed');
      });
  }
};
