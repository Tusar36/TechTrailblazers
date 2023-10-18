const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: [
      "https://mellow-muffin-d81b7a.netlify.app",
      "https://techtrailblazer.netlify.app",
    ],
  })
);

//Routes
app.use("/auth", require("./routes/Authroute"));
app.use("/blog", require("./routes/BlogRoute"));
app.get("/", (req, res) => {
  res.send("HELLO");
});
mongoose
  .connect("mongodb+srv://Tusar:9831445592@tusar.nsj1q0z.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(4000, () => {
      console.log(`Server running`);
      console.log(`Connected to mongodb`);
    });
  });
