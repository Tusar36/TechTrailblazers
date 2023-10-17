import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authcontext from "./Context/AuthContext";
import LoginInfoContext from "./Context/LoginInfoContext";
import { useContext } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Logined, setLogined] = useContext(Authcontext);
  const [UserInfo, setUserInfo] = useContext(LoginInfoContext);
  const navigate = useNavigate();
  const handelSubmit = async () => {
    if (password.length < 8) {
      toast.warn("Password should not have less than 8 letters", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_API}/auth/login`,
          {
            password,
            email,
          }
        );
        console.log(result);
        localStorage.setItem("token", result.data.token);
        toast.success("Login Successful", {
          position: toast.POSITION.TOP_CENTER,
        });
        setLogined(true);
        setUserInfo({
          name: result.data.name,
          email: result.data.email,
          _id: result.data._id,
        });
        navigate("/");
        // document.location.reload();
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="shadow-black shadow w-[400px] h-[650px] m-auto my-10 px-10 py-5 flex flex-col md:w-[500px]">
        <h1 className="text-5xl my-5">LOGIN</h1>
        <hr className="bg-gray-500 h-[5px] my-5" />
        <input
          type="text"
          className="border border-gray-600 py-2 px-6 my-5 outline-none"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          className="border border-gray-600 py-2 px-6 my-5 outline-none"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <button
          className={
            "border border-black text-white py-2 px-6 my-5 outline-none hover:bg-gray-900  bg-black"
          }
          onClick={handelSubmit}
        >
          LOGIN
        </button>
        <p className="text-gray-500 w-50px mx-auto text-lg">or</p>
        <NavLink
          to="/register"
          className="w-72 mx-auto text-center my-5 text-blue-600"
        >
          Sign Up
        </NavLink>
      </div>
    </>
  );
}
