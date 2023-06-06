import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Dot from "../../components/dot/Dot";
import http from "../../config/axiosConfig";
import { useParams } from "react-router-dom";

const ReservationDetailPage = () => {
  const { roomId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    http.get(`rooms/${roomId}`).then((res) => {
      setData(res.data);
    });
  }, []);
  const handleRequestBooking = () => {};
  return (
    <div className="w-full mt-[50px] max-w-[1100px] mx-auto">
      <div className="flex flex-row gap-5 items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 cursor-pointer">
          <MdOutlineKeyboardArrowLeft className="w-6 h-6" />
        </div>
        <h1 className="font-medium text-3xl">Request to book</h1>
      </div>
      <div className="w-full flex flex-row mt-[30px]">
        <div className="w-[50%] pl-[60px]">
          <h2 className="font-semibold text-xl">Your Trip</h2>
          <div className="grid grid-cols-2">
            <div>
              <div className="font-medium mt-5">Check In</div>
              <div className="text-sm font-normal mt-3">06/06/2023</div>
            </div>
            <div>
              <div className="font-medium mt-5">Check Out</div>
              <div className="text-sm font-normal mt-3">06/10/2023</div>
            </div>
            <div>
              <div className="font-medium mt-5">Guests</div>
              <div className="text-sm font-normal mt-3">1 Guest</div>
            </div>
            <div>
              <div className="font-medium mt-5">Pets</div>
              <div className="text-sm font-normal mt-3">Yes</div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-slate-300 mt-10"></div>
          <h2 className="font-semibold text-xl mt-10">
            Required for your trip
          </h2>
          <div className="font-medium mt-5">Message the Host</div>
          <div className="text-sm font-normal mt-2">
            Let the Host know why you're traveling and when you'll check in.
          </div>
          <div className="font-medium mt-5">Phone number</div>
          <div className="text-sm font-normal mt-2">
            Add and confirm your phone number to get trip updates.
          </div>
          <div className="w-full h-[1px] bg-slate-300 mt-10"></div>
          <h2 className="font-semibold text-xl mt-10">Ground rules</h2>
          <div className="text-sm font-normal mt-5">
            We ask every guest to remember a few simple things about what makes
            a great guest.
          </div>
          <div className="text-sm font-normal mt-2 flex flex-row gap-3 items-center">
            <Dot />
            <p>Add and confirm your phone number to get trip updates.</p>
          </div>
          <div className="text-sm font-normal mt-2 flex flex-row gap-3 items-center">
            <Dot />
            <p>Treat your Host’s home like your own.</p>
          </div>
          <div className="w-full h-[1px] bg-slate-300 mt-10"></div>
          <h2 className="font-medium text-lg mt-10">
            Your reservation won’t be confirmed until the Host accepts your
            request.
          </h2>
          <div className="mt-10 mb-10 max-w-[200px]">
            <button
              onClick={handleRequestBooking}
              className="w-full px-5 py-3 bg-primary text-white rounded-lg hover:bg-primaryHover hover:-translate-y-[1px] shadow-lg shadow-green-400/100"
            >
              Request to Book
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <div className="w-full px-5 py-5 shadow-md">
            <div className="w-full flex flew-row gap-3">
              <div className="w-[120px] h-[120px]">
                <img alt="" src={data?.imageDtos ?? data?.imageDtos[0]?.url} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;
