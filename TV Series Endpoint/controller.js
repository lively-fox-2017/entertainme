const express = require('express');
const TvSeries = require('./models/TvSeries');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', (req, res) => {
  TvSeries.create({
    'title': req.body.title,
    'overview': req.body.overview,
    'poster_path': req.body.poster_path,
    'popularity': req.body.popularity,
    'tag': Array.isArray(req.body.tag) ? req.body.tag : [req.body.tag],
    'status': req.body.popularity,
  })
  .then((tvSeries) => {
    res.status(200).send(JSON.stringify(tvSeries));
  })
  .catch((err) => {
    res.status(500).send(err);
  })
})

router.get('/', async (req, res) => {
  try {
    let tvSeries = await TvSeries.find();
    res.status(200).send(JSON.stringify(tvSeries))
  } catch (e) {
    res.status(500).send(e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    let tvSeries = await TvSeries.findOne({_id: mongoose.Types.ObjectId(req.params.id)});
    if (tvSeries) {
      tvSeries.title = req.body.title || tvSeries.title;
      tvSeries.overview = req.body.overview || tvSeries.overview;
      tvSeries.poster_path = req.body.poster_path || tvSeries.poster_path;
      tvSeries.popularity = req.body.popularity || tvSeries.popularity;
      tvSeries.tag = req.body.tag || tvSeries.tag;
      tvSeries.status = req.body.status || tvSeries.status;
      await tvSeries.save();
      res.status(200).send(JSON.stringify(tvSeries))
    } else {
      throw 'Not Found'
    }
  } catch (e) {
    res.status(500).send({e, message: 'err'});
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let tvSeries = await TvSeries.findOneAndRemove({_id: mongoose.Types.ObjectId(req.params.id)});
    res.send(json.stringify(JSON.stringify(tvSeries)))
  } catch (e) {
    res.status(500).send({e, message: 'err'})
  }
})

module.exports = router;
