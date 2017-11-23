const modelEntertaint = require('../models/entertaint')

class entertaintController {
  static async getAll(req,res){
    try{
      const movielist=  await modelEntertaint.getAll()
      res.status(200).json(JSON.parse(movielist))
    }
    catch(err){
      res.status(400).json(err)
    }
  }
}

module.exports = entertaintController;
