var app = require('fastify')()
var axios = require('axios')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

var db = 'mongodb://localhost/movies'

mongoose.connect(db, { useMongoClient: true });


var Movies = require('./models/movie')

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', async (req,res) => {
    var data = await Movies.find({})

    res.send({
        info: 'movies found successfully',
        data: data
    })
})

app.post('/', async (req,res) => {
    var newMovie = new Movies(req.body)

    // console.log(newMovie)
    var result = await newMovie.save()    

    var update = await axios.get('http://localhost:3000/movieUpdate')

    if(update.data === true) {
        res.send({
            savedData: result,
            msg: 'Movie data saved'
        })
    }
})

app.listen(3001, function(err) {
    if(err) throw err
    console.log(`server is listening on port 3001`)
})