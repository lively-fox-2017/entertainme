var app = require('fastify')()
var axios = require('axios')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = 'mongodb://localhost/movies'

mongoose.connect(db, { useMongoClient: true });

var Series = require('./models/series')

app.get('/', async (req,res) => {
    var data = await Series.find({})

    res.send({
        info: 'series found successfully',
        data: data
    })
})

app.post('/', async (req,res) => {
    var newSeries = new Series(req.body)

    var result = await newSeries.save()

    var update = await axios.get('http://localhost:3000/movieSeries')    

    if(update.data === true) {
        res.send({
            msg: 'series has been saved',
            savedData: result
        })
    }
})

app.listen(3002, function(err) {
    if(err) throw err
    console.log(`server is listening on port 3002`)
})