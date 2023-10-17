const blogs = require("../model/Blog");
const DeleteBlog = async (req, res) => {
  const id = req.params.id.trim();
  try {
    await blogs.findOneAndRemove({ _id: id });
    res.status(200).json({
      success: true,
      message: "Blog Deleted",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = DeleteBlog;
