import React from "react";
import Dot from "../../components/dot/Dot";
import { FaBath, FaBed } from "react-icons/fa";
import DatePicker from "react-datepicker";

const RoomDetails = () => {
  return (
    <div className="w-full mt-[10px] max-w-[1250px] mx-auto">
      <h1 className="name text-2xl font-medium ">
        Villa Artist, Vintage Style
      </h1>
      <div className="mt-2 flex flex-row gap-3 text-sm items-baseline">
        <div className="flex flex-row gap-1 items-center">
          <div className="w-3 h-3">
            <svg
              className="w-full h-full"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path
                d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="font-medium"> 4.5</span>
        </div>
        <Dot />
        <span className="font-medium underline underline-offset-1">
          35 reviews
        </span>
        <Dot />
        <span className="type text-sm text-grayText font-nomal mb-1">
          Villa
        </span>
        <Dot />
        <span className="address text-sm font-medium">Hai Chau, Da Nang</span>
      </div>
      <div className="w-full h-[400px] mt-4 grid grid-cols-4 gap-2 rounded-xl overflow-hidden">
        <div className="w-full h-full col-span-2 row-span-2">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-39974109/original/4bf3e6ff-555a-4553-973e-a371d4331e43.jpeg?im_w=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-39974109/original/55815056-3820-4cf0-8442-d4b382b22ba0.jpeg?im_w=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-39974109/original/55815056-3820-4cf0-8442-d4b382b22ba0.jpeg?im_w=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-39974109/original/55815056-3820-4cf0-8442-d4b382b22ba0.jpeg?im_w=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-full">
          <img
            src="https://a0.muscache.com/im/pictures/miso/Hosting-39974109/original/55815056-3820-4cf0-8442-d4b382b22ba0.jpeg?im_w=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="w-full mt-8 flex flex-row">
        <div className="w-[60%]">
          <h2 className="text-xl font-semibold text-slate-600">
            Property features
          </h2>
          <div className="w-full flex flex-row mt-8 gap-4 flex-wrap">
            <div className="w-[200px] h-[70px] flex flex-row gap-3 items-center justify-center  border border-slate-300 rounded-xl shadow-md">
              <FaBed className="text-2xl" />
              <span>2 Double Bed</span>
            </div>
            <div className="w-[200px] h-[70px] flex flex-row gap-3 items-center justify-center  border border-slate-300 rounded-xl shadow-md">
              <FaBath className="text-2xl" />
              <span>1 Bathroom</span>
            </div>
            <div className="w-[200px] h-[70px] flex flex-row gap-3 items-center justify-center  border border-slate-300 rounded-xl shadow-md">
              <FaBed className="text-2xl" />
              <span>2 Double Bed</span>
            </div>
            <div className="w-[200px] h-[70px] flex flex-row gap-3 items-center justify-center  border border-slate-300 rounded-xl shadow-md">
              <FaBed className="text-2xl" />
              <span>2 Double Bed</span>
            </div>
            <div className="w-[200px] h-[70px] flex flex-row gap-3 items-center justify-center  border border-slate-300 rounded-xl shadow-md">
              <FaBed className="text-2xl" />
              <span>2 Double Bed</span>
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <div className="w-full max-w-[500px] shadow-xl border border-slate-200 px-5 py-5 rounded-2xl">
            <div className="flex flex-row justify-between items-baseline">
              <div className="flex flex-row gap-1 items-baseline">
                <span className="font-medium text-2xl">$40</span>
                <span className="font-light">Day</span>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <div className="flex flex-row gap-1 items-center">
                  <div className="w-3 h-3">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="presentation"
                      focusable="false"
                    >
                      <path
                        d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="font-medium"> 4.5</span>
                </div>
                <Dot />
                <span className="font-normal text-slate-600 underline underline-offset-1">
                  35 reviews
                </span>
              </div>
            </div>
            <div className="w-full mt-3">
              <div className=" ">
                <span>Check In</span>
                <div className="date_picker_wrapper">
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    timeFormat={false}
                    className="datePicker"
                    closeOnSelect={true}
                    inputProps={{ readOnly: true }}
                  />
                </div>
              </div>
              <div className=" ">
                <span>Check Out</span>
                <div className="date_picker_wrapper">
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    timeFormat={false}
                    className="datePicker"
                    closeOnSelect={true}
                    inputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
