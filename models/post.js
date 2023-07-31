const mongoose = require("mongoose");
const { Schema } = mongoose;
const Post = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageURL: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "collection" },
  },
  {
    timestamps: true,
  }
);
const postModel = mongoose.model("post", Post);
module.exports = postModel;
