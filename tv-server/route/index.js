'use strict'

const router = require('express').Router();

const controller = require('./../controller');

/*
Create tv
*/
router.post('/', controller.create);

/*
Read all tv
*/
router.get('/', controller.findAll);

/*
Read SINGLE tv by id
*/
router.get('/:id', controller.findOne);

/*
Update SINGLE tv by id
*/
router.put('/:id', controller.update);

/*
Delete SINGLE tv by id
*/
router.delete('/:id', controller.destroy);

module.exports = router;