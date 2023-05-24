import React from "react";
import { sidebarLinks } from "./helpers";
import { NavLink } from "react-router-dom";
import "./styles.scss";

const Sidebar = () => {
  return (
    <div className="side-bar w-[300px] rounded-xl shadow-xl">
      <div className="sidebar-logo cursor-pointer flex items-center mb-5 pt-5 px-5 font-medium gap-5">
        <div className="h-[40px] w-[40px]">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-lg font-bungee text-primary">AirDnD</div>
      </div>
      {sidebarLinks.map((link) => (
        <NavLink to={link.url} className="menu-item" key={link.title}>
          <span className="menu-icon">{link.icon}</span>
          <span className="menu-text">{link.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
