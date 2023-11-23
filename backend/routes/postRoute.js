const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

const {createPost,getAllPosts,getPost} = require("../controller/postController");

router.post("/upload",validateToken,createPost);
router.get("/all",validateToken,getAllPosts);
router.post("/post:id",validateToken,getPost);

module.exports = router;