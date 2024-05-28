const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageTargetsSchema = new Schema({
  image: { type: String },
  targets: {
    target_1: {
      coordinateX: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
      coordinateY: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
    },
    target_2: {
      coordinateX: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
      coordinateY: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
    },
    target_3: {
      coordinateX: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
      coordinateY: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
    },
  },
});

module.exports = mongoose.model('ImageTargets', ImageTargetsSchema);
