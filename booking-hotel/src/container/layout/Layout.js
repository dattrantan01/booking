import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-[100vh] h-[100vh] w-[100%] flex flex-col">
      <div className="w-[100%] h-[100%] overflow-y-auto">
        <Header></Header>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
