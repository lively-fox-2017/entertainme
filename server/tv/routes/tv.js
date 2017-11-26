// const fastify = require('fastify')()
// const router  = fastify.Router()
// const axios   = require('axios');

const TvController = require('../controller/tv')

console.log('router tv')

//model
// const TvModel = require('../models/Tv')

// fastify parsing
// fastify.register(require('fastify-formbody'), {}, (err) => {
//     if (err) throw err
//     console.log('fastify-formbody running !')
// })

// fastify.get('/', async (req, res) => {
//     try {
//         const result = await TvModel.find({})
//         console.log(result)
//         res.send({
//             msg: 'fetch tv series success',
//             data: result
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

// fastify.post('/', async(req,res)=>{
//     try {
//         console.log(req.body.id)
//         res.send(req.body)
//         const data = await TvModel.create({
//             title: req.body.title,
//             overview: req.body.overview,
//             poster_path: req.body.poster_path,
//             popularity: req.body.popularity,
//             tag: req.body.tag,
//             status: req.body.status
//         })
//         res.send({
//             data:data
//         })
//     } catch (error){
//         console.log(error)
//     }
// })

// fastify.delete('/:id', async (req, res) => {
//     console.log(req.params.id + 'smth')
//     try {
//         console.log('req.body.id')
//         // res.send('req.body')
//         const deleteData = await TvModel.remove({
//             _id: '5a197f7dbd62970973b070b5',
//         })
//         res.send({
//             data: deleteData
//         })
//     } catch (error) {
//         console.log(error)
//     }
// })

// module.exports = router
// module.exports = fastify

// module.exports = function (fastify, opts, next) {
//     fastify.post('/post_tv', TvController.postTv)
//     fastify.get('/all', TvController.getAll)
//     next()
// }

module.exports = function (fastify, opts, next) {
    fastify.get('/', TvController.getAll)
    fastify.post('/', TvController.createTv)
    fastify.get('/single/:id', TvController.singleTv)
    fastify.put('/:id', TvController.updateTv)
    fastify.delete('/:id', TvController.removeTv)

    next()
}