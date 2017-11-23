let movie = require('../models/movie-model')
var mongoose = require('mongoose');

// Hapus
const axios = require('axios')
const redis = require("redis");
const client = redis.createClient();

const respond = (data) => {
  return JSON.stringify(data)
};


const getRepos = (req, res) => {
  console.log('masuk');
  axios.get(`http://localhost:3000`)
  .then(dataMovie => {
    client.setex('semuafilm', 30, respond(dataMovie))
  })
};



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
    getRepos()
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
    getRepos()
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
    getRepos()
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
