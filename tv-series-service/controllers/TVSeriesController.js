const TVSeries = require('../models/TVSeries');

class TVSeriesController {
  static fetchAll(req, res) {
    TVSeries
      .find({})
      .sort('-popularity')
      .then((tvSeries) => {
        res.status(200).json(tvSeries);
      })
      .catch((err) => {
        res.status(400).json(tvSeries);
      });
  }

  static create(req, res) {
    TVSeries
      .insertMany(req.body)
      .then((tvSeries) => {
        res.status(201).json(tvSeries);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }

  static fetchById(req, res) {
    TVSeries
      .findById(req.params.id)
      .then((tvSeries) => {
        if (!tvSeries) {
          res.status(404).json({});
        } else {
          res.status(200).json(tvSeries);
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });
  }

  static update(req, res) {
    TVSeries
      .findById(req.params.id)
      .then((tvSeries) => {
        if (!tvSeries) {
          res.status(404).json({});
        } else {
          TVSeries
            .updateOne({ _id: req.params.id }, req.body)
            .then((response) => {
              res.status(200).json(tvSeries);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });
  }

  static delete(req, res) {
    TVSeries
      .findById(req.params.id)
      .then((tvSeries) => {
        if (!tvSeries) {
          res.status(404).json({});
        } else {
          TVSeries
            .deleteOne({ _id: req.params.id })
            .then((response) => {
              res.status(200).json(tvSeries);
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          res.status(404).json({});
        } else {
          res.status(400).json(err);
        }
      });
  }
}

module.exports = TVSeriesController;
