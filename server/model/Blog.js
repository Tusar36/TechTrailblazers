const mongoose = require("mongoose");

const Blog = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    required: true,
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("blogs", Blog);
