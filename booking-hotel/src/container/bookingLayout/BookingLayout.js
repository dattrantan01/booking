import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const booking = [
  {
    name: "Pending",
    url: "/booking/1",
    color: "text-yellow-500",
  },
  {
    name: "Approved",
    url: "/booking/2",
    color: "text-green-500",
  },
  {
    name: "Reject",
    url: "/booking/3",
    color: "text-red-500",
  },
  {
    name: "Success",
    url: "/booking/4",
    color: "text-purple-500",
  },
];

const BookingLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    return;
  });

  return (
    <div className="w-full flex flex-col max-w-[1250px] mx-auto">
      <div className="w-full flex flex-col h-fit shadow-lg rounded-lg mt-24 pt-5">
        <div className="w-full flex flex-row h-[60px] shadow-xl shadow-black-400/100">
          {booking.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.url}
                className={({ isActive }) =>
                  `h-full w-[calc(100%/4)] font-semibold ${
                    item.color
                  } cursor-pointer hover:bg-green-100 flex justify-center items-center ${
                    isActive ? "bg-green-50" : "bg-transparent"
                  }`
                }
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="w-full min-h-[600px] shadow-lg">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default BookingLayout;
