const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const UserScore = require('../models/user-score');
const ImageTargets = require('../models/image-targets');

exports.homepage_get = asyncHandler(async (req, res) => {
  const getAllScores = await UserScore.find().sort({ time: -1 }, { timestamp: -1 });
  if (!getAllScores) {
    res.status(204).json({ error: 'Scores not available' });
  } else {
    res.status(200).json(getAllScores);
  }
});

exports.game_post = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    imageName, imageWidth, imageHeight, coordinateX, coordinateY, targetChose,
  } = req.body;
  const scaleWidthRatio = imageWidth / 1467;
  const scaleHeightRatio = imageHeight / 1648;
  const scaledCoordinateX = coordinateX / scaleWidthRatio;
  const scaledCoordinateY = coordinateY / scaleHeightRatio;

  const imageToFind = await ImageTargets.find({ imageName });

  if (!imageToFind) {
    res.status(404).json({ error: 'Image not found' });
  } else {
    const target = imageToFind.targets[targetChose];
    const minorCoordinateX = target.coordinateX.minorCoordinate;
    const majorCoordinateX = target.coordinateX.majorCoordinate;
    const minorCoordinateY = target.coordinateY.minorCoordinate;
    const majorCoordinateY = target.coordinateY.majorCoordinate;

    if (scaledCoordinateX >= minorCoordinateX && scaledCoordinateX <= majorCoordinateX
      && scaledCoordinateY >= minorCoordinateY && scaledCoordinateY <= majorCoordinateY) {
      res.status(200).json({ targetChose: true });
    } else {
      res.status(200).json({ targetChose: false });
    }
  }
});
