'use strict'
const fastify = require('fastify')()
const cors = require('cors')()

require('dotenv').config()

const movie = require('./models/movie')

fastify.get('/', (req, reply) => {
  reply.send({server_name : 'movie server'})
})

fastify.get('/movies', async function (req, reply) {
  var data = await movie.find({})
  reply.send({
    "info":"movie found succesfully",
    "data":data
  })
})

fastify.post('/movies', async function (req, reply) {
  try {
    var data = await movie.create({
      poster_path : req.body.poster_path,
      overview : req.body.overview,
      title : req.body.title,
      popularity : req.body.popularity,
      tag : req.body.tag
    })
    reply.send({
      "info":"movie created succesfully",
      "data":data
    })
  } catch (e) {
    console.log(e);
  }
})

fastify.delete('/movies/:id', async function (req, reply) {
  try {
    var data = await movie.findOneAndRemove({
      _id:req.params.id
    })
    reply.send({
      "info":"movie deleted succesfully",
      "data":data
    })
  } catch (e) {
    console.log(e);
  }
})

fastify.listen(3001, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`);
})
