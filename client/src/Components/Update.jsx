import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function Update() {
  const { id } = useParams();
  const [LoadingFlag, setLoadingFlag] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const FetchData = async () => {
    try {
      setLoadingFlag(true);
      const result = await axios.get(
        `https://tech-trailblazers-api.onrender.com/blog/${id}`
      );
      setContent(result.data.result.content);
      setTitle(result.data.result.title);
      setLoadingFlag(false);
    } catch (error) {
      toast.error("Network Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const UpdateHandler = async (e) => {
    try {
      e.preventDefault();
      await axios.post(
        `https://tech-trailblazers-api.onrender.com/blog/update`,
        {
          title: title,
          content: content,
          id: id,
        }
      );
      toast.success("Blog Updated", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/myblog");
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
  return !LoadingFlag ? (
    <>
      <form>
        <div className="w-screen min-h-screen p-10">
          <div className="flex gap-4 h-[8vh]">
            <input
              type="text"
              value={title}
              placeholder="Enter Title"
              className=" w-[100%] p-3 outline-none border-b-2 border-black text-lg"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
            <button
              className="bg-red-600 text-white px-3 py-2  hover:bg-red-500 flex items-center"
              onClick={UpdateHandler}
            >
              Update
            </button>
          </div>
          <div>
            <textarea
              className="border border-black  min-h-[90vh] w-[100%] my-9 p-5 resize-none outline-none"
              placeholder="Enter your content here"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              required
            ></textarea>
          </div>
        </div>
      </form>
    </>
  ) : (
    <Loading />
  );
}
