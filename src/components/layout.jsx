import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "../style/layout.css";

export default function Layout() {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-main">
        <Outlet />   
      </div>
    </div>
  );
}
