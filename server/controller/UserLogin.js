const user = require("../model/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Login = async (req, res) => {
  const { email, password } = req.body;
  const Check = await user.findOne({ email });
  if (Check == null) {
    return res.status(404).json({
      status: false,
      message: "Email does not exist",
    });
  }
  const compare = await bcrypt.compare(password, Check.password);
  if (!compare) {
    return res.status(401).json({
      status: false,
      message: "Password Incorrect",
    });
  } else {
    const token = JWT.sign({ _id: Check._id }, "iamtusarkantimandal");
    res.status(200).json({
      name: Check.name,
      email: email,
      _id: Check._id,
      token,
    });
  }
};

module.exports = Login;
