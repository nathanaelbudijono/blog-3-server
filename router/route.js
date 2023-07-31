const { Router } = require("express");
const {
  postCreateUser,
  postLoginUser,
  getUserInfo,
  postUserLogout,
} = require("../controller/controller");
const router = Router();

router.route("/login").post(postLoginUser);
router.route("/register").post(postCreateUser);
router.route("/user").get(getUserInfo);
router.route("/logout").post(postUserLogout);

module.exports = { router };
