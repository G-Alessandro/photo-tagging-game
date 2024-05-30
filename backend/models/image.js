const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = new Schema({
  imageName: { type: String },
  imageWidth: { type: Number },
  imageHeight: { type: Number },
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

module.exports = mongoose.model('Image', ImageSchema, 'playable-images');
