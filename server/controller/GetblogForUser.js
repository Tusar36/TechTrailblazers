const blogs = require("../model/Blog");

const GetblogForUser = async (req, res) => {
  const author = req.params.name;
  const search = await blogs.find({ author });
  if (search.length == 0) {
    return res.status(404).json({
      status: false,
      message: "No blogs found for the author",
    });
  }
  try {
    res.status(200).json({
      status: true,
      data: search,
      total: search.length,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};
module.exports = GetblogForUser;
