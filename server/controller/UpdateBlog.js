const blogs = require("../model/Blog");

const UpdateBlog = async (req, res) => {
  const { title, content, id } = req.body;
  try {
    await blogs.findOneAndUpdate(
      { _id: id },
      {
        title,
        content,
      }
    );
    res.status(200).json({
      success: true,
      message: "Blog Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

module.exports = UpdateBlog;
