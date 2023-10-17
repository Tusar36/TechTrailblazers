const blogs = require("../model/Blog");

const BolgData = async (req, res) => {
  const id = req.params.id;
  const result = await blogs.findOne({ _id: id });
  res.json({
    result,
  });
};

module.exports = BolgData;
