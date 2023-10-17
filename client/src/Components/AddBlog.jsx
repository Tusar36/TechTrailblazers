import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import LoginInfoContext from "./Context/LoginInfoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AddBlog(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [UserInfo] = useContext(LoginInfoContext);
  const navi = useNavigate();
  const Publish = async (e) => {
    e.preventDefault();
    const result = await axios.post(`${process.env.REACT_APP_API}/blog/add`, {
      title,
      content,
      author: UserInfo.name,
    });
    toast.success("Blog Publihed!", {
      position: toast.POSITION.TOP_CENTER,
    });
    navi("/");
  };
  return (
    <>
      <form>
        <div className="w-screen min-h-screen p-10">
          <div className="flex gap-4">
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
              onClick={Publish}
            >
              Publish
            </button>
          </div>
          {/* <div className="mt-5">Word Count : {content.trim(" ").length}</div> */}
          <div>
            <textarea
              className="border border-black  min-h-screen w-[100%] my-9 p-5 resize-none outline-none"
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
  );
}
