'use strict'
const fastify = require('fastify')()
const cors = require('cors')()

require('dotenv').config()

const tv_series = require('./models/tv_series')

fastify.get('/', (req, reply) => {
  reply.send({server_name : 'tv_series server'})
})

fastify.get('/tv_series', async function (req, reply) {
  var data = await tv_series.find({})
  reply.send({
    "info":"tv_series found succesfully",
    "data":data
  })
})

fastify.post('/tv_series', async function (req, reply) {
  console.log('heereee');
  try {
    var data = await tv_series.create({
      poster_path : req.body.poster_path,
      overview : req.body.overview,
      title : req.body.title,
      popularity : req.body.popularity,
      tag : req.body.tag
    })
    reply.send({
      "info":"tv_series created succesfully",
      "data":data
    })
  } catch (e) {
    console.log(e);
  }
})

fastify.delete('/tv_series/:id', async function (req, reply) {
  try {
    var data = await tv_series.findOneAndRemove({
      _id:req.params.id
    })
    reply.send({
      "info":"tv_series deleted succesfully",
      "data":data
    })
  } catch (e) {
    console.log(e);
  }
})

fastify.listen(3002, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`);
})
