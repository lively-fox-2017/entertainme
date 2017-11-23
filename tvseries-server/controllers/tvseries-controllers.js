let tvseries = require('../models/tvseries-model')
var mongoose = require('mongoose');

// Create Movie (v)
const addTvseries = (req,res) => {
  tvseries.create({
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
  .then((moviedata)=>{
    res.send(moviedata)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// Get Movie (v)
const getTvseries = (req,res) => {
  tvseries.find()
  .then((moviedata)=>{
    res.send(moviedata)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// Edit Movie(v)
const editTvseries = (req,res) => {
  tvseries.update({
    _id:req.params.id
  },{
    title: req.body.title,
    overview: req.body.overview,
    poster_path: req.body.poster_path,
    popularity: req.body.popularity,
    tag: req.body.tag
  })
  .then((moviedata)=>{
    res.send(moviedata)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// Delete Data(v)
const deleteTvseries = (req,res) => {
  tvseries.remove({
    _id:req.params.id
  })
  .then((moviedata)=>{
    res.send(moviedata)
  })
  .catch((err)=>{
    res.send(err)
  })
}

module.exports = {
  getTvseries,
  addTvseries,
  editTvseries,
  deleteTvseries
}
