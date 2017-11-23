const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3002;
const tvSeriesRoutes = require('./routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/tv-series', tvSeriesRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

app.listen(port, console.log('TV Series Service running on port', port));

module.exports = app;
