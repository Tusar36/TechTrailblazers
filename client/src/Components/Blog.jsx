import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useContext } from "react";
import LoginInfoContext from "./Context/LoginInfoContext";
import { toast } from "react-toastify";
export default function Blog() {
  const { id } = useParams();
  const [Data, setData] = useState();
  const [LoadingFlag, setLoadingFlag] = useState(true);
  const [UserInfo, setUserInfo] = useContext(LoginInfoContext);

  const navigate = useNavigate();

  const FetchData = async () => {
    try {
      setLoadingFlag(true);
      const result = await axios.get(
        `https://tech-trailblazers-api.onrender.com/blog/${id}`
      );
      setData(result.data.result);
      setLoadingFlag(false);
    } catch (error) {
      toast.error("Network Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    FetchData();
    window.scroll(0, 0);
  }, [id]);

  const DeleteBlog = async () => {
    try {
      await axios.get(
        `https://tech-trailblazers-api.onrender.com/blog/delete/${id}`
      );
      toast.success("Blog Deleted!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/myblog");
    } catch (error) {}
  };

  return !LoadingFlag ? (
    <>
      <div className="min-h-screen ">
        <h1 className="w-[100%] text-center font-bold text-3xl my-5">
          {Data.title}
        </h1>
        <h1 className="w-[100%] text-center text-gray-600  mb-5">
          author: {Data.author}
        </h1>
        <h1 className="w-[100%] text-center text-gray-600 mb-5">
          Date: {Data.date.slice(0, Data.date.indexOf("T"))}
        </h1>
        {UserInfo.name == Data.author && (
          <h1 className="w-[100%] flex justify-center flex-wrap text-gray-600 mb-5 md:flex-nowrap gap-4">
            <button
              className="bg-red-600 text-white px-20 py-2  hover:bg-red-500 flex items-center mx-4"
              onClick={DeleteBlog}
            >
              Delete
            </button>
            <button
              className="bg-gray-800 text-white px-20 py-2  hover:bg-gray-700 flex items-center mx-4"
              onClick={() => {
                navigate(`/update/${id}`);
              }}
            >
              Edit
            </button>
          </h1>
        )}
        <div
          className="px-5 min-h-[100vh] w-[100%] mb-12 shadow-xl"
          readOnly
          style={{ whiteSpace: "pre-line" }}
        >
          {Data.content}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}
