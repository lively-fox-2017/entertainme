const app = require('express')();
const cors = require('cors');

const port = process.env.PORT || 3000;
const routes = require('./routes');

app.use(cors());

app.use('/', routes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found'
  });
});

app.listen(port, console.log('Orchestrator running on port', port));
