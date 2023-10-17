const user = require("../model/User");
const bcrypt = require("bcrypt");
const Register = async (req, res) => {
  const { name, password, email } = req.body;
  const check = await user.findOne({ email });
  const check2 = await user.findOne({ name });
  if (check != null) {
    return res.status(401).json({
      status: false,
      message: "Email already in use",
    });
  }
  if (check2 != null) {
    return res.status(401).json({
      status: false,
      message: "Name already in use",
    });
  }
  const salt = 10;
  const hashedPass = await bcrypt.hash(password, salt);
  try {
    user.create({
      name: name,
      email: email,
      password: hashedPass,
    });
    res.status(200).json({
      status: true,
      message: "User registerd",
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

module.exports = Register;
