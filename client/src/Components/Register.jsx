import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { toast } from "react-toastify";
export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (name.length == 0 || email.length == 0) {
      toast.warn("Name or Email field should not be left empty", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (password.length < 8) {
      toast.warn("Password should have more than 8 characters", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      try {
        setLoad(true);
        const result = await axios.post(
          `https://tech-trailblazers-api.onrender.com/auth/register`,
          {
            name: name,
            password: password,
            email: email,
          }
        );
        setLoad(false);
        if (result.data.status == true) {
          navigate("/login");
          toast.success("User Registered");
        }
      } catch (error) {
        setLoad(false);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  return Load ? (
    <Loading />
  ) : (
    <>
      <form action="">
        <div className="shadow-black shadow w-[400px] h-[650px] m-auto my-10 px-10 py-5 flex flex-col md:w-[500px]">
          <h1 className="text-5xl my-5">Sign Up</h1>
          <hr className="bg-gray-500 h-[5px] my-5" />
          <input
            type="text"
            className="border border-gray-600 py-2 px-6 my-5 outline-none"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            required
          />
          <input
            type="text"
            className="border border-gray-600 py-2 px-6 my-5 outline-none"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value.trim(" "));
            }}
            value={email}
            required
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
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
}
