const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserScoreSchema = new Schema({
  imageName: {
    type: String,
  },
  username: {
    type: String,
  },
  time: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
});

module.exports = mongoose.model('UserScore', UserScoreSchema, 'users-score');
