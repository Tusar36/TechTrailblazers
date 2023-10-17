import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Authcontext from "./Context/AuthContext";
import LoginInfoContext from "./Context/LoginInfoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Navbar() {
  const [Logined, setLogined] = useContext(Authcontext);
  const [UserInfo, setUserInfo] = useContext(LoginInfoContext);
  const [show, setShow] = useState(false);
  const [DropdownShow, setDropdownShow] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between px-5 py-5 bg-gray-900 sticky top-0">
        <div className="text-white font-bold text-2xl">TechTrailblazers</div>
        <button
          className="sm:hidden text-white w-16 text-lg"
          onClick={() => {
            if (DropdownShow) {
              setDropdownShow(false);
            } else {
              setDropdownShow(true);
            }
          }}
        >
          &#9776;
        </button>
        <div className="list-none justify-between text-white gap-5 hidden sm:flex">
          <NavLink to="/" className="">
            Home
          </NavLink>
          {Logined && (
            <NavLink to="/myblog" className="">
              My Blog
            </NavLink>
          )}
          <NavLink to="/about" className="">
            About
          </NavLink>
          {!Logined ? (
            <NavLink to="/login" className="">
              Login
            </NavLink>
          ) : (
            <div>
              <button
                className="border border-white px-5 "
                onClick={() => {
                  if (show) {
                    setShow(false);
                  } else {
                    setShow(true);
                  }
                }}
              >
                {UserInfo.name.length > 8
                  ? UserInfo.name.slice(0, 8) + ".."
                  : UserInfo.name}
              </button>
            </div>
          )}
          {!Logined && (
            <NavLink to="/register" className="">
              Sign Up
            </NavLink>
          )}
        </div>
      </nav>
      {/* DropDown for hamburger */}
      {DropdownShow && (
        <div className="w-[100%] justify-end h-[0.1px]  sticky top-[4.1rem] sm:hidden block">
          <div className="w-[100%] bg-gray-900 opacity-90 flex flex-col gap-5 py-5 pl-3 text-white">
            <NavLink to="/" className="text-white">
              Home
            </NavLink>
            {Logined && (
              <NavLink to="/myblog" className="text-white">
                My Blog
              </NavLink>
            )}
            <NavLink to="/about" className="text-white">
              About
            </NavLink>
            {!Logined ? (
              <NavLink to="/login" className="">
                Login
              </NavLink>
            ) : (
              <div className="w-[100%] text-white ">
                <p className="font-bold ">{UserInfo.name}</p>
                <p className="text-gray-400">{UserInfo.email}</p>
              </div>
            )}
            {!Logined && (
              <NavLink to="/register" className="">
                Sign Up
              </NavLink>
            )}
            {Logined && (
              <button
                className="w-[100%] text-white hover:cursor-pointer text-start"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  setLogined(false);
                  navigate("/");
                  setUserInfo({
                    name: "",
                    email: "",
                    _id: "",
                  });
                  toast.success("Logged Out Successfully", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  setShow(false);
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
      {/* UserInfo DropDown */}
      {Logined && show && (
        <div className=" w-[100%] justify-end h-[0.1px]  sticky top-[4.1rem] sm:flex hidden">
          <div className="min-w-[8rem] h-[100px] bg-gray-900 ">
            <div className="w-[100%] text-white px-2 hover:bg-gray-700 py-1 text-center hover:cursor-pointer">
              <p className="font-bold ">{UserInfo.name}</p>
              <p className="text-gray-400">{UserInfo.email}</p>
            </div>
            <button
              className="w-[100%] text-white px-2 hover:bg-gray-700 py-1"
              onClick={() => {
                localStorage.removeItem("token");
                setLogined(false);
                navigate("/");
                setUserInfo({
                  name: "",
                  email: "",
                  _id: "",
                });
                toast.success("Logged Out Successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
                setShow(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
