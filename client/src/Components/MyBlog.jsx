import React, { useEffect } from "react";
import { useContext, useState } from "react";
import Authcontext from "./Context/AuthContext";
import LoginInfoContext from "./Context/LoginInfoContext";
import Loading from "./Loading";
import axios from "axios";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
export default function MyBlog() {
  const [Logined, setLogined] = useContext(Authcontext);
  const [UserInfo] = useContext(LoginInfoContext);
  const [data, setData] = useState([]);
  const [LoadingFlag, setLoadingFlag] = useState(false);
  const [E404, setE404] = useState(false);
  const navigate = useNavigate();

  const FetchUserBlog = async () => {
    try {
      setLoadingFlag(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API}/blog/q/${UserInfo.name}`
      );
      setData(result.data.data);
      setLoadingFlag(false);
    } catch (error) {
      setLoadingFlag(false);
      setE404(true);
    }
  };

  useEffect(() => {
    FetchUserBlog();
    window.scroll(0, 0);
  }, [Logined]);

  return !LoadingFlag ? (
    <>
      <div className="w-[100%] flex flex-col items-center mt-5 ">
        <button
          className="bg-red-600 text-white px-3 py-2  hover:bg-red-500 flex items-center"
          onClick={() => {
            window.scroll(0, 0);
            navigate("/addBlog");
          }}
        >
          <span className="text-2xl mr-2">&#x2B;</span> Add Blog
        </button>
      </div>
      <div className="w-screen h-screen flex justify-center flex-wrap gap-10 mt-10 mb-10 ">
        {data.map((e) => {
          return (
            <Card
              heading={e.title}
              content={e.content}
              author={UserInfo.name}
              date={e.date}
              key={e._id}
              id={e._id}
            />
          );
        })}
        {E404 && (
          <div className="text-4xl">You dont have any Blogs published yet</div>
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
}
