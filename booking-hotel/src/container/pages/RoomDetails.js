import React, { useEffect, useState } from "react";
import Dot from "../../components/dot/Dot";
import { FaBath, FaBed } from "react-icons/fa";
import DatePicker from "react-datepicker";
import Field from "../../components/field/Field";
import CheckboxNoForm from "../../components/checkbox/CheckboxNoForm";
import Button from "../../components/button/Button";
import { useAuth } from "../../context/authContext";
import { useNavigate, useParams } from "react-router";
import http from "../../config/axiosConfig";
import RoomDetailReservation from "../roomDetailReservation/RoomDetailReservation";
import ReviewList from "../reviews/ReviewList";
import { AiFillStar } from "react-icons/ai";

const RoomDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [listComment, setListComment] = useState([]);
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    const query = userId ? `rooms/${id}?customerId=${userId}` : `rooms/${id}`;
    http.get(query).then((res) => {
      setData(res.data);
    });

    http.get(`reviews/rooms/${id}`).then((res) => setListComment(res.data));
  }, [userId, id]);

  return (
    <div className="w-full mt-[10px] max-w-[1250px] mx-auto">
      <h1 className="name text-2xl font-medium ">{data?.roomName}</h1>
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
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <span className="font-medium"> {data?.averageRating}</span>
        </div>
        <Dot />
        <span className="font-medium underline underline-offset-1">
          {listComment?.length || 0} reviews
        </span>
        <Dot />
        <span className="type text-sm text-grayText font-normal mb-1">
          {data?.roomTypeName}
        </span>
        <Dot />
        <span className="address text-sm font-medium">{`${data?.address}, ${data?.provinceName}`}</span>
      </div>
      <div className="w-full h-[400px] mt-4 grid grid-cols-4 grid-row-2 gap-2 rounded-xl overflow-hidden">
        {data?.imageDtos?.length &&
          data?.imageDtos.map((item, index) => {
            if (index === 0)
              return (
                <div
                  key={index}
                  className="w-full h-[400px] col-span-2 row-span-2"
                >
                  <img
                    src={item.url}
                    alt=""
                    key={item.id}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            return (
              <div key={index} className="w-[310px] h-[205px]">
                <img
                  src={item.url}
                  alt=""
                  key={item.id}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        {/* <div className="w-full h-full col-span-2 row-span-2">
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
        </div> */}
      </div>
      <div className="w-full mt-8 flex flex-row">
        <div className="w-[60%]">
          <h2 className="text-xl font-semibold text-slate-600 mb-2">
            About this place
          </h2>
          <div>{data?.description}</div>
          <h2 className="text-xl font-semibold text-slate-600 mt-4">
            Property features
          </h2>
          <div className="w-full flex flex-row mt-8 gap-4 flex-wrap">
            {data?.utilitiesDtos &&
              data?.utilitiesDtos?.length &&
              data?.utilitiesDtos?.map((item) => {
                return (
                  <div className="w-[200px] h-[70px] flex flex-row gap-3 items-center justify-center  border border-slate-300 rounded-xl shadow-md">
                    <AiFillStar className="text-2xl" />
                    <span>{`${item.value} ${item.name}`}</span>
                  </div>
                );
              })}
          </div>
          <ReviewList reviews={listComment} />
        </div>
        <div className="w-[40%]">
          <RoomDetailReservation
            roomDetails={data}
            id={id}
            reviews={listComment}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
