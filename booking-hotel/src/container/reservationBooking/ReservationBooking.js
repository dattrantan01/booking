import moment from "moment";
import React, { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import {
  MdMeetingRoom,
  MdPeople,
  MdCalendarToday,
  MdFormatListBulleted,
} from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaUserPlus, FaDog } from "react-icons/fa";
import Button from "../../components/button/Button";
const ReservationBooking = ({
  roomName,
  userName,
  startDate,
  status = "PENDING",
  id,
  handleReject,
  handlePayment,
  imgUrl,
  isLoadingButton,
}) => {
  // const startDateShow = moment(startDate).format("DD-MM-YYYY");
  // const endDate = moment(startDate)
  //   .add(monthRent, "months")
  //   .format("DD-MM-YYYY")
  //   .toString();
  return (
    <div className="relative z-10 rounded-lg w-full bg-slate-100 px-5 py-5 flex flex-col">
      <div className="mt-5 text-lg">
        <div className="w-full flex flex-row gap-3">
          <div className="w-[150px] h-[150px]">
            <img src={imgUrl} alt="" className="object-contain w-full h-full" />
          </div>
          <div className="w-[calc(100%-150px)]">
            <div className="w-full grid grid-cols-2">
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdMeetingRoom />
                  <span className="font-semibold">Room name:</span>
                  <span>{"MGM"}</span>
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">Check In Date:</span>
                  <span>{"11/06/2023"}</span>
                </div>
              </div>

              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdPeople />
                  <span className="font-semibold">Customer:</span>
                  <span>{userName}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <MdCalendarToday />
                  <span className="font-semibold">Check Out Date:</span>
                  <span>{"11/06/2023"}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <FaUserPlus />
                  <span className="font-semibold">Persons:</span>
                  <span>{"3"}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <FaDog />
                  <span className="font-semibold">Pets:</span>
                  <span>{"Yes"}</span>
                </div>
              </div>
              <div>
                <div className="flex flex-row gap-2 items-center">
                  <FiClipboard />
                  <span className="font-semibold">Status:</span>
                  <div
                    className={`${
                      status === "APPROVED"
                        ? "bg-green-400"
                        : status === "PENDING"
                        ? "bg-yellow-400"
                        : status === "REJECT"
                        ? "bg-red-400"
                        : "bg-purple-400"
                    } text-white font-semibold px-2 py-1 rounded-full`}
                  >
                    {status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {status === "APPROVED" && (
          <div className="w-full mt-5 mx-auto max-w-[200px] ">
            <button
              className="px-4 py-2 bg-red-500 text-white shadow-lg rounded-md hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-2xl"
              onClick={() => handlePayment(id)}
            >
              Payment
            </button>
          </div>
        )}
        {status === "PENDING" && (
          <div className="w-full mx-auto max-w-[200px]">
            <button
              className="px-4 py-2 bg-red-500 text-white shadow-lg rounded-md hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-2xl"
              onClick={() => handleReject(id)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationBooking;
