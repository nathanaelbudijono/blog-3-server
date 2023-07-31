const collection = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const secret = "averylongsecret";
const salt = bcrypt.genSaltSync(10);
app.use(cookieParser());

async function postLoginUser(req, res) {
  const { username, password } = req.body;
  const userDoc = await collection.findOne({ username });
  const correctPass = bcrypt.compareSync(password, userDoc.password);
  if (correctPass) {
    jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
      res.cookie("token", token);
      res.send("Cookie set");
    });
  } else {
    res.status(404).json("wrong credential");
  }
}

async function postCreateUser(req, res) {
  const { username, password } = req.body;
  try {
    const userDoc = await collection.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (err) {
    console.log(err);
  }
}

async function getUserInfo(req, res) {
  if (req.headers.cookie) {
    const cookie = req.headers.cookie.split("=")[1];
    jwt.verify(cookie, secret, {}, (err, token) => {
      if (err) {
        res.status(404).json("Wrong credential");
      } else {
        res.json(token);
      }
    });
  } else {
    res.status(404).json("Wrong credential");
  }
}

async function postUserLogout(req, res) {
  res.cookie("token", "").json("Removed");
}
module.exports = { postCreateUser, postLoginUser, getUserInfo, postUserLogout };
