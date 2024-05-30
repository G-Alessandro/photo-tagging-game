const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const UserScore = require('../models/user-score');
const Image = require('../models/image');

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
    imageName, imageContainerSize, mouseCoordinatesToSend, targetChose,
  } = req.body;

  const imageToFind = await Image.findOne({ imageName });

  const scaleWidthRatio = imageContainerSize.width / imageToFind.imageWidth;
  const scaleHeightRatio = imageContainerSize.height / imageToFind.imageHeight;
  const scaledCoordinateX = Math.floor(mouseCoordinatesToSend.coordinateX / scaleWidthRatio);
  const scaledCoordinateY = Math.floor(mouseCoordinatesToSend.coordinateY / scaleHeightRatio);

  if (!imageToFind) {
    res.status(404).json({ error: 'Image not found' });
  } else {
    const targetNumberIndex = targetChose.lastIndexOf('_');
    const targetNumber = Number(targetChose.slice(targetNumberIndex + 1));
    const target = imageToFind.targets[targetChose];
    const minorCoordinateX = target.coordinateX.minorCoordinate;
    const majorCoordinateX = target.coordinateX.majorCoordinate;
    const minorCoordinateY = target.coordinateY.minorCoordinate;
    const majorCoordinateY = target.coordinateY.majorCoordinate;

    if (scaledCoordinateX >= minorCoordinateX && scaledCoordinateX <= majorCoordinateX
      && scaledCoordinateY >= minorCoordinateY && scaledCoordinateY <= majorCoordinateY) {
      res.status(200).json({ result: true, targetNumber });
    } else {
      res.status(200).json({ result: false, targetNumber });
    }
  }
});
