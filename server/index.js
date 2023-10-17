const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.use("/auth", require("./routes/Authroute"));
app.use("/blog", require("./routes/BlogRoute"));

const port = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
      console.log(`Connected to mongodb`);
    });
  });
