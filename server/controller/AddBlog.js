const blogs = require("../model/Blog");

const AddBlog = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    await blogs.create({
      title,
      content,
      author,
    });
    res.status(200).json({
      status: true,
      message: "Blog added",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Blog failed added",
      error,
    });
  }
};
module.exports = AddBlog;
