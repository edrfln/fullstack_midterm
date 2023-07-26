const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoID: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  comments: [commentSchema],
});

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
