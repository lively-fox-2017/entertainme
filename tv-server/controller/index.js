'use strict'

const model = require('./../model');
const generateResponse = require('./../helpers/generate-response');
const notifyUpdate = require('./../helpers/notify-update');

const create = async (req, res) => {
  let response;

  try {
    const created = await model.create(req.body);
    response = generateResponse(200, 'create new tv entry', created, null);
    notifyUpdate();
  } catch (err) {
    response = generateResponse(500, 'failed to create new tv entry', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const findAll = async (req, res) => {
  let response;

  try {
    const tvs = await model.find().exec();
    response = generateResponse(200, 'read all tvs', tvs, null);
  } catch (err) {
    response = generateResponse(500, 'failed to read all tvs', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const  findOne = async (req, res) => {
  let response;

  try {
    const tv = await model.findById(req.params.id);
    response = generateResponse(200, 'read single tv', tv, null);
  } catch (err) {
    response = generateResponse(500, 'failed read single tv', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const update = async (req, res) => {
  let response;

  try {
    const updated = await model.update({_id: req.params.id}, req.body);
    if (updated.n === 0) throw new Error('tv not found');
    response = generateResponse(200, 'update tv', updated, null);
    notifyUpdate();
  } catch (err) {
    response = generateResponse(500, 'failed to update tv', null, err);
  } finally {
    res.status(response.status).send(response);
  }
};

const destroy = async (req, res) => {
  let response;

  try {
    const destroyed = await model.deleteOne({_id: req.params.id});
    if (destroyed.result.n === 0) throw new Error('tv not found');
    response = generateResponse(200, 'delete tv', destroyed, null);
    notifyUpdate();
  } catch (err) {
    response = generateResponse(500, 'failed to delete tv', null, err);
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