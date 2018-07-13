const Movie = require('../models/movies')

class movieControllers {
  static getmovie(req,res){
      Movie.find()
      .then(result=>{
        res.status(200).json({info:'movies found successfully', data:result})
      }).catch(err=>{
        res.status(400).json({err:err})
    })
  }

  static addmovie(req,res){
    Movie.create(req.body)
    .then(result=>{
      res.status(200).json({movies:result})
    }).catch(err=>{
      res.status(400).json({err:err})
  })
  }


}

module.exports = movieControllers;
