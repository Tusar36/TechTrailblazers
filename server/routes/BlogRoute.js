const express = require("express");
const router = express.Router();

//Controllers
const AddBlog = require("../controller/AddBlog");
const GetAllBlogs = require("../controller/GetAllblog");
const GetblogForUser = require("../controller/GetblogForUser");
const DeleteBlog = require("../controller/DeleteBlog");
const UpdateBlog = require("../controller/UpdateBlog");
const BlogData = require("../controller/BlogData");
//Route for adding blog
router.post("/add", AddBlog);

//Route for searching blog for user
router.get("/q/:name", GetblogForUser);

//Route for searching blog for user
router.get("/:id", BlogData);

//Route for getting all blogs
router.get("/", GetAllBlogs);

//Route for Updating a blog
router.get("/delete/:id", DeleteBlog);

//Route for Updating a blog
router.post("/update", UpdateBlog);

module.exports = router;
