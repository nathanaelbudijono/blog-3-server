const collection = require("../models/user");
const postModel = require("../models/post");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
const secret = "averylongsecret";
const salt = bcrypt.genSaltSync(10);
app.use(cookieParser());

async function postBlog(req, res) {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split("=")[1];
    jwt.verify(cookie, secret, {}, async (err, token) => {
      if (err) {
        res.status(404).json("Error");
      } else {
        const { title, content, imageURL } = req.body;
        try {
          const postDoc = await postModel.create({
            title,
            content,
            imageURL,
            cover: crypto.randomBytes(8).toString("hex"),
            author: token.id,
          });
          res.json(postDoc);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}
async function getBlogPrivate(req, res) {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split("=")[1];
    jwt.verify(cookie, secret, {}, async (err, token) => {
      if (err) {
        res.status(404).json("Error");
        console.log(err);
      } else {
        try {
          const authorId = token.id;
          const getPostDoc = await postModel
            .find({ author: authorId })
            .populate("author", ["username"]);
          res.json(getPostDoc);
        } catch (err) {
          console.log(err);
          res.status(500).json("Internal Server Error");
        }
      }
    });
  }
}

async function getBlogPublic(req, res) {
  const getPostPub = await postModel.find().populate("author", ["username"]);
  res.json(getPostPub);
}
async function getAllBlog(req, res) {
  const { cover } = req.params;
  try {
    const getBlog = await postModel
      .find({ cover })
      .populate("author", ["username"]);
    res.json(getBlog);
  } catch (err) {
    res.status(404).json("Cant fetch data");
    console.log(err);
  }
}

async function updatePrivateBlog(req, res) {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split("=")[1];
    jwt.verify(cookie, secret, {}, async (err, token) => {
      if (err) {
        res.status(203).json("not authorized");
      } else {
        try {
          const updateBlog = await postModel.updateOne({
            title: req.body.title,
            content: req.body.content,
            imageURL: req.body.imageURL,
          });
          res.json(updateBlog);
        } catch (err) {
          res.status(500).json("Internal Server Error");
          console.log(err);
        }
      }
    });
  }
}

async function deletePost(req, res) {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split("=")[1];
    jwt.verify(cookie, secret, {}, async (err, token) => {
      if (err) {
        res.json("Fail to delete");
      } else {
        try {
          const { cover } = req.params;

          const delRes = await postModel.deleteOne({ cover });
          if (delRes.deletedCount === 1) {
            console.log("Deleted");
          } else {
            console.log("delete fail");
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}
module.exports = {
  postBlog,
  getBlogPrivate,
  getBlogPublic,
  getAllBlog,
  updatePrivateBlog,
  deletePost,
};
