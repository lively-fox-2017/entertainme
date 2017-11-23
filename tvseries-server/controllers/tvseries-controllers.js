let tvseries = require('../models/tvseries-model')
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
    getRepos()
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
    getRepos()
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
    getRepos()
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
