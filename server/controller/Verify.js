const JWT = require("jsonwebtoken");
const user = require("../model/User");
const Verify = async (req, res) => {
  const { token } = req.body;
  try {
    const verify = JWT.verify(
      token,
      process.env.PRIVATE,
      async (error, decode) => {
        if (error) {
          res.json({
            login: false,
          });
        } else {
          const { name, email } = await user.findOne({ _id: decode });
          res.json({
            login: true,
            name,
            email,
            _id: decode._id,
          });
        }
      }
    );
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = Verify;
