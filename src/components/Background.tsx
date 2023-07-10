import React from "react";
import { Outlet } from "react-router-dom";
import "./app.css";
function Background() {
  return (
    <>
      <div className="context">
        <Outlet />
      </div>

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default Background;
