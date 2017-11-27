'use strict'

const router = require('express').Router();

const controller = require('./../controller');

/*
Create movie
*/
router.post('/', controller.create);

/*
Read all movie
*/
router.get('/', controller.findAll);

/*
Read SINGLE movie by id
*/
router.get('/:id', controller.findOne);

/*
Update SINGLE movie by id
*/
router.put('/:id', controller.update);

/*
Delete SINGLE movie by id
*/
router.delete('/:id', controller.destroy);

module.exports = router;