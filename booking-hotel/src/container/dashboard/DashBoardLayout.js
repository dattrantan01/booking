import React from "react";
import { Outlet } from "react-router-dom";
import DashBoardHeader from "./DashBoardHeader";
import "./styles.scss";
import Sidebar from "./Sidebar";

const DashBoardLayout = () => {
  return (
    <div className="max-w-[1600px] mx-auto my-0">
      <DashBoardHeader></DashBoardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayout;
