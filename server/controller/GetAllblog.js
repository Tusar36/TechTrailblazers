const blogs = require("../model/Blog");

const GetAllBlogs = async (req, res) => {
  try {
    const data = await blogs.find();
    res.status(200).json({
      status: true,
      data,
      total: data.length,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};

module.exports = GetAllBlogs;
