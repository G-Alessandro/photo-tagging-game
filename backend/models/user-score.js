const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserScoreSchema = new Schema({
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

module.exports = mongoose.model('UserScore', UserScoreSchema);
