const express = require('express');
const axios = require('axios');
const router = express.Router();

axios.defaults.baseURL = 'http://localhost:3002/tvseries';

router.get('/', async (req, res) => {
  const request = await axios.get('/');
  res.send(JSON.stringify(request.data)).status(200);
})

router.post('/', async (req, res) => {
  const params = {};
  req.body.title && (params.title = req.body.title);
  req.body.overview && (params.overview = req.body.overview);
  req.body.poster_path && (params.poster_path = req.body.poster_path);
  req.body.popularity && (params.popularity = req.body.popularity);
  req.body.tag && (params.tag = req.body.tag);
  req.body.status && (params.status = req.body.status);

  const request =  await axios.post('/', params);
  res.send(JSON.stringify(request.data)).status(200);
})

router.put('/:id', async (req, res) => {
  const params = {};
  req.body.title && (params.title = req.body.title);
  req.body.overview && (params.overview = req.body.overview);
  req.body.poster_path && (params.poster_path = req.body.poster_path);
  req.body.popularity && (params.popularity = req.body.popularity);
  req.body.tag && (params.tag = req.body.tag);
  req.body.status && (params.status = req.body.status);

  const request = await axios.put(`/${req.params.id}`, params);
  res.send(JSON.stringify(request.data)).status(200);
})

router.delete('/:id', async (req, res) => {
  const request = await axios.delete(`/`)
})

module.exports = router;
