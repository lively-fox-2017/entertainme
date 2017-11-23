const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 3001;
const moviesRoutes = require('./routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/movies', moviesRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

app.listen(port, console.log('Movies Service running on port', port));

module.exports = app;
