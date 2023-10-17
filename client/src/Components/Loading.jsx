import React from "react";
import loading from "./loading.gif";
export default function Loading() {
  return (
    <div className="w-72 m-auto">
      <div className="w-[100%]">
        <img src={loading} alt="" className=" m-auto" />
      </div>
      <div className="w-[100%] h-screen"></div>
    </div>
  );
}
