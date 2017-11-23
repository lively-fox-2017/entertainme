let movie = require('../models/movie-model')
var mongoose = require('mongoose');

// Create Movie (v)
const addMovie = (req,res) => {
  movie.create({
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
const getMovie = (req,res) => {
  movie.find()
  .then((moviedata)=>{
    res.send(moviedata)
  })
  .catch((err)=>{
    res.send(err)
  })
}
// Edit Movie(v)
const editMovie = (req,res) => {
  movie.update({
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
const deleteMovie = (req,res) => {
  movie.remove({
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
  getMovie,
  addMovie,
  editMovie,
  deleteMovie
}
