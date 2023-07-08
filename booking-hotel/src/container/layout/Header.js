import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { PATHS } from "../../utils/paths";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const clickCoworkingSpace = () => {
    navigate("/");
  };
  const handleSignInOut = () => {
    if (!user?.id) {
      navigate("/login");
    }
    if (user?.id) {
      localStorage.removeItem("token");
      setUser({
        id: "",
        customerName: "",
        email: "",
        phoneNumber: "",
        roleName: "",
        timeCreate: "",
        timeUpdate: "",
      });
      setShow(false);
      navigate("/");
    }
  };
  const items = [
    {
      url: PATHS.base,
      name: "Home",
    },
    {
      url: PATHS.explore,
      name: "Explore",
    },
    {
      url: PATHS.bookings,
      name: "Booking",
    },
  ];
  return (
    <div className="relative header w-[100%] minH-[70px] h-[80px] max-w-[1300px] bg-white flex flex-row items-center mx-auto bg-noColor">
      <div
        className=" cursor-pointer h-[60px] flex flex-row items-center gap-3"
        onClick={() => clickCoworkingSpace()}
      >
        <div className="h-[40px] w-[40px] ">
          <img
            src="/logo.png"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="text-2xl font-bungee text-primary">AirDnD</div>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center ml-16">
        {items.map((item) => (
          <NavLink
            to={user?.id ? item.url : "/login"}
            key={item.name}
            className={({ isActive }) =>
              `text-base cursor-pointer hover:text-primary border-b-noColor border-b hover:border-primary ${
                isActive ? "text-primary" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="flex flex-row gap-2 relative ml-auto">
        <FaUserCircle
          className="text-3xl cursor-pointer text-primary"
          onClick={() => {
            setShow((prev) => !prev);
          }}
        />
        <span className="text-primary font-medium">
          {user?.id && user?.customerName}
        </span>
      </div>
      {show && (
        <div className="cursor-pointer w-[200px] absolute -bottom-8 right-1 translate-y-[50%] z-20 shadow-xl border-slate-200 border drop-shadow-2xl rounded-xl bg-white">
          <div
            className="w-full  px-3 py-3 hover:bg-purple-100 rounded-xl"
            onClick={handleSignInOut}
          >
            {user?.id ? <span>Sign out</span> : <span>Sign in</span>}
          </div>
          <div
            onClick={() => navigate(PATHS.manage)}
            className="w-full px-3 py-3 hover:bg-purple-100 rounded-xl"
          >
            Manage
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
