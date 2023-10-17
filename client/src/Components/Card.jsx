import React from "react";
import { NavLink } from "react-router-dom";
export default function Card({ heading, author, date, content, id }) {
  return (
    <>
      <NavLink to={`/blog/${id}`}>
        <div className=" w-96 h-[300px] hover:cursor-pointer border-black border bg-white ">
          <div className="p-5 w-[100%] ">
            <p className="text-xl font-bold 3">{heading}</p>
            <p className="text-gray-500  w-[100%] my-3">
              <div>
                <p>date:{date.slice(0, date.indexOf("T"))}</p>
                <p>
                  author: <span className="text-black font bold">{author}</span>{" "}
                </p>
              </div>
            </p>
            <p className="text-gray-800 text-lg w-[100%] my-3">
              {content.slice(0, 150)}...
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
}
