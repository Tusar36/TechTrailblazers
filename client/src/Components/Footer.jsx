import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-semibold">TechTrailblazers</h2>
        <p className="text-sm my-4">Your source for tech insights and news</p>
        <p className="text-sm my-4">
          &copy; 2023 TechTrailblazers. All rights reserved | by Tusar
        </p>
      </div>
    </footer>
  );
}
