//model
const TvModel = require('../models/Tv')

class TvClass {
    constructor() {
        
    }

    static async getAll (req,res) {
        try {
            const result = await TvModel.find({})
            console.log(result)
            res.send(result)
        } catch (error){
            console.error(error)
            res.send(error)
        }
    }

    static async createTv (req,res) {
        // res.send('1')
        try {
            const result = await TvModel.create({
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tag: req.body.tag,
                status: req.body.status
            })
            
            res.send({
                msg: 'POST data Success',
                data:result
            })
        } catch (error){
            console.log(error)
            res.send(err)
        }
    }

    static async singleTv (req,res) {
        try {
            const result = await TvModel.findOne({ _id:req.params.id})
            res.send(result)
        } catch (err) {
            console.error(err)
        }
    }

    static async updateTv (req,res) {
        // res.send(req.params.id)
        try {
            const result = await TvModel.findOneAndUpdate({
                _id:req.params.id
            },{    
                $set:{
                    title:req.body.title,
                    overview: req.body.overview,
                    poster_path: req.body.poster_path,
                    popularity: req.body.popularity,
                    tag: req.body.tag,
                    status: req.body.status
                }
                // ,
                // $addToSet: { tag: req.body.tag}
            })
            res.send(result)
        } catch (err) {
            console.error(err)
            res.send(err)
        }
    }

    static async removeTv (req,res) {
        // res.send(req.params.id)
        try {
            console.log('req.body.id')
            const deleteData = await TvModel.remove({
                _id: req.params.id,
            })
            res.send({
                data: deleteData
            })
        } catch (error) {
            console.log(error)
        }
    }   
}

module.exports = TvClass