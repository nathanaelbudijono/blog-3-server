const { Router } = require("express");
const {
  postBlog,
  getBlogPrivate,
  getBlogPublic,
  getAllBlog,
  updatePrivateBlog,
  deletePost,
} = require("../controller/postController");
const postRouter = Router();

postRouter.route("/postBlog").post(postBlog);
postRouter.route("/getPost").get(getBlogPrivate);
postRouter.route("/getallpost").get(getBlogPublic);
postRouter.route("/getallblog/:cover").get(getAllBlog);
postRouter.route("/update").put(updatePrivateBlog);
postRouter.route("/deletepost/:cover").delete(deletePost);
module.exports = { postRouter };
