const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  hour: { type: String, required: true },
  applied: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: undefined,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
