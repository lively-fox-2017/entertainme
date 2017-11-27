const express = require('express');
const Movie = require('./models/Movie');
const mongoose = require('mongoose');
const redis = require('redis');

const client = redis.createClient();

const router = express.Router();

router.post('/', (req, res) => {
  Movie.create({
    'title': req.body.title,
    'overview': req.body.overview,
    'poster_path': req.body.poster_path,
    'popularity': req.body.popularity,
    'tag': Array.isArray(req.body.tag) ? req.body.tag : [req.body.tag],
    'status': req.body.popularity,
  })
  .then((movie) => {
    client.set('movieUpdateDate', (Math.floor(Date.now() / 1000)).toString());
    res.status(200).send(JSON.stringify(movie));
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

router.get('/', async (req, res) => {
  try {
    let movie = await Movie.find();
    res.status(200).send(JSON.stringify(movie))
  } catch (e) {
    res.status(500).send(e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    console.log(req.body);
    let movie = await Movie.findOne({_id: mongoose.Types.ObjectId(req.params.id)});
    if (movie) {
      movie.title = req.body.title || movie.title;
      movie.overview = req.body.overview || movie.overview;
      movie.poster_path = req.body.poster_path || movie.poster_path;
      movie.popularity = req.body.popularity || movie.popularity;
      movie.tag = req.body.tag || movie.tag;
      movie.status = req.body.status || movie.status;
      await movie.save();
      res.status(200).send(JSON.stringify(movie))
    } else {
      throw 'Not Found'
    }
  } catch (e) {
    res.status(500).send({e, message: 'err'});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let movie = await Movie.findOneAndRemove({_id: mongoose.Types.ObjectId(req.params.id)});
    res.send(JSON.stringify(movie))
  } catch (e) {
    res.status(500).send({e, message: 'err'})
  }
})

module.exports = router;
