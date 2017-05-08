'use strict';

const Source = require('./source.model');

/* export */

module.exports = {
  getAll,
  getAllActive,
  getById,
  count
};

/* methods */
function getAll() {
  return Source.find().exec();
}

function getAllActive() {
  return Source.find({
    active: true
  }).exec();
}

function getById(args) {
  return Source.findOne({
    id: args.id
  }).exec();
}

function count() {
  return Source.count().exec();
}
