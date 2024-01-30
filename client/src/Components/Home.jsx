import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useContext } from "react";
import LoginInfoContext from "./Context/LoginInfoContext";
import AuthContext from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { toast } from "react-toastify";
export default function Home() {
  const [UserInfo, setUserInfo] = useContext(LoginInfoContext);
  const [Logined, setLogined] = useContext(AuthContext);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState();
  const [LoadingFlag, setLoadingFlag] = useState(true);
  const FetchAllBlogs = async () => {
    try {
      const result = await axios.get(
        `https://tech-trailblazers-api.onrender.com/blog/`
      );
      setBlogs(result.data.data.reverse());
      setLoadingFlag(false);
    } catch (error) {
      toast.error("Network Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    FetchAllBlogs();
  }, [Logined]);

  return !LoadingFlag ? (
    <>
      <header className="w-[100%] bg-gray-800 h-[95vh] flex flex-col items-center justify-center gap-12">
        <p className="text-4xl text-white font-bold md:text-6xl">
          TechTrailblazers
        </p>
        <span className="text-gray-500 w-[50%] text-center">
          Your Guide to the Cutting Edge of Tech. Discover the latest gadgets,
          insights, and how-tos on the digital frontier. Join our tech-savvy
          community today!
        </span>
        {!Logined ? (
          <button
            className="bg-red-600 text-white px-20 py-2  hover:bg-red-500 flex items-center"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        ) : (
          <button
            className="bg-red-600 text-white px-20 py-2  hover:bg-red-500 flex items-center"
            onClick={() => {
              window.scrollTo({
                left: 0,
                top: 600,
                behavior: "smooth",
              });
            }}
          >
            Explore
          </button>
        )}
      </header>

      <div className="w-[100%] flex flex-col items-center mt-5 ">
        {Logined && (
          <button
            className="bg-red-600 text-white px-3 py-2  hover:bg-red-500 flex items-center"
            onClick={() => {
              window.scroll(0, 0);
              navigate("/addBlog");
            }}
          >
            <span className="text-2xl mr-2">&#x2B;</span> Add Blog
          </button>
        )}
      </div>
      <div className="flex justify-center flex-wrap gap-10 mt-10 mb-10">
        {blogs.map((e) => {
          return (
            <Card
              heading={e.title}
              content={e.content}
              author={e.author}
              date={e.date}
              id={e._id}
              key={e._id}
            />
          );
        })}
      </div>
    </>
  ) : (
    <Loading />
  );
}
