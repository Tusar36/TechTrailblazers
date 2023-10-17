import "./App.css";
import React, { useEffect, useContext, useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import MyBlog from "./Components/MyBlog";
import Register from "./Components/Register";
import Error from "./Components/404Error";
import axios from "axios";
import Authcontext from "./Components/Context/AuthContext";
import LoginInfoContext from "./Components/Context/LoginInfoContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import Footer from "./Components/Footer";
import AddBlog from "./Components/AddBlog";
import Blog from "./Components/Blog";
import Update from "./Components/Update";
import About from "./Components/About";
import { toast } from "react-toastify";

function App() {
  const [Logined, setLogined] = useContext(Authcontext);
  const [UserInfo, setUserInfo] = useContext(LoginInfoContext);
  const [Flag, setFlag] = useState(false);
  const Verify = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/verify`,
        {
          token: localStorage.getItem("token"),
        }
      );
      setFlag(true);
      if (response.data.login) {
        setLogined(true);
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          _id: response.data._id,
        });
      } else {
        setLogined(false);
      }
    } catch (error) {
      toast.success("Blog Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    Verify();
  }, []);

  return Flag ? (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myblog" element={<MyBlog />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default App;
