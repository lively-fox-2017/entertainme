'use strict'

const model = require('./../model');
const generateResponse = require('./../helpers/generate-response');

const create = async (req, res) => {
  let response;

  try {
    const created = await model.create(req.body);
    response = generateResponse(200, 'create new movie entry', created, null);
  } catch (err) {
    response = generateResponse(500, 'failed to create new movie entry', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const findAll = async (req, res) => {
  let response;

  try {
    const movies = await model.find().exec();
    response = generateResponse(200, 'read all movies', movies, null);
  } catch (err) {
    response = generateResponse(500, 'failed to read all movies', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const  findOne = async (req, res) => {
  let response;

  try {
    const movie = await model.findById(req.params.id);
    response = generateResponse(200, 'read single movie', movie, null);
  } catch (err) {
    response = generateResponse(500, 'failed read single movie', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const update = async (req, res) => {
  let response;

  try {
    const updated = await model.update({_id: req.params.id}, req.body);
    if (updated.n === 0) throw new Error('movie not found');
    response = generateResponse(200, 'update movie', updated, null);
  } catch (err) {
    response = generateResponse(500, 'failed to update movie', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const destroy = async (req, res) => {
  let response;

  try {
    const destroyed = await model.deleteOne({_id: req.params.id});
    if (destroyed.result.n === 0) throw new Error('movie not found');
    response = generateResponse(200, 'delete movie', destroyed, null);
  } catch (err) {
    response = generateResponse(500, 'failed to delete movie', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  destroy,
};