import React, { useEffect, useState } from "react";
import DatePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Field from "../../components/field/Field";
import CheckboxNoForm from "../../components/checkbox/CheckboxNoForm";
import Button from "../../components/button/Button";
import Dot from "../../components/dot/Dot";
import http from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";
import { AiFillMinusCircle } from "react-icons/ai";
import { format } from "date-fns";
import moment from "moment";

const convertDateToString = (date) => {
  const dateObj = new Date(date);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate() + 1;
  const year = dateObj.getUTCFullYear();
  const rs = year + "-" + month + "-" + day;
  return format(new Date(rs), "yyyy-MM-dd");
};

const RoomDetailReservation = ({ id, roomDetails, reviews }) => {
  const [validDates, setInvalidDates] = useState([]);
  console.log(
    "🚀 ~ file: RoomDetailReservation.js:26 ~ RoomDetailReservation ~ validDates:",
    validDates
  );
  const [isPet, setIsPet] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [limitDate, setLimitDate] = useState(new Date());
  console.log(
    "🚀 ~ file: RoomDetailReservation.js:35 ~ RoomDetailReservation ~ limitDate:",
    limitDate
  );
  const navigate = useNavigate();

  useEffect(() => {
    http.get(`reservations/get_invalid_date/${id}`).then((res) => {
      setInvalidDates(res.data);
    });
  }, []);

  useEffect(() => {
    const date = convertDateToString(startDate);
    http
      .get(`reservations/furthest_valid_date/${id}?from=${date}`)
      .then((res) => {
        setLimitDate(res.data);
      });
  }, [startDate]);

  const disableCustomDate = (current) => {
    if (validDates) {
      return (
        !validDates.includes(current.format("YYYY-MM-DD")) &&
        new Date(current) > new Date()
      );
    }
  };

  const disableEndDate = (current) => {
    return (
      new Date(current) <= new Date(limitDate) &&
      new Date(current) >= new Date(startDate) &&
      new Date(current) >= new Date() &&
      startDate != null
    );
  };

  const handleCheckInDate = (date) => {
    setStartDate(date);
  };

  const handleCheckOutDate = (date) => {
    setEndDate(date);
  };

  const handleChangeGuests = (e) => {
    const numberOfGuests = e.target.value;
    const maxQuantityPeople = roomDetails?.maxQuantityPeople || 1;
    if (numberOfGuests < 1 || numberOfGuests > maxQuantityPeople) return;
    setGuests(numberOfGuests);
  };

  const handleClickReserve = () => {
    if (!startDate && !endDate) return;
    navigate(
      PATHS.reservationDetailWithSearchParams
        .replace("startDate", moment(startDate).format("MM/DD/YYYY"))
        .replace("endDate", moment(endDate).format("MM/DD/YYYY"))
        .replace("guests", guests)
        .replace(":roomId", id)
        .replace("pet", isPet || false)
    );
  };

  return (
    <div className="w-full max-w-[500px] shadow-xl border border-slate-200 px-5 py-5 rounded-2xl">
      <div className="flex flex-row justify-between items-baseline">
        <div className="flex flex-row gap-1 items-baseline">
          <span className="font-medium text-2xl">${roomDetails?.price}</span>
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
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="font-medium">{roomDetails?.averageRating}</span>
          </div>
          <Dot />
          <span className="font-normal text-slate-600 underline underline-offset-1">
            {reviews?.length || 0} reviews
          </span>
        </div>
      </div>
      <div className="w-full mt-3">
        <div className=" ">
          <span>Check In</span>
          <div className="date_picker_wrapper">
            <DatePicker
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              className="datePicker"
              wrapperClassName="datePicker"
              minDate={new Date()}
              closeOnSelect={true}
              value={startDate}
              onChange={(date) => handleCheckInDate(date)}
              isValidDate={disableCustomDate}
            />
          </div>
        </div>
        <div className="mt-4">
          <span>Check Out</span>
          <div className="date_picker_wrapper">
            <DatePicker
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              className="datePicker"
              wrapperClassName="datePicker"
              minDate={startDate}
              closeOnSelect={true}
              value={endDate}
              onChange={(date) => handleCheckOutDate(date)}
              isValidDate={disableEndDate}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row gap-5 mt-4">
        <Field>
          <span>Guests ({roomDetails?.maxQuantityPeople})</span>
          <input
            type="number"
            className="w-full px-3 py-2 outline-none border focus:border-primary"
            value={guests}
            onChange={handleChangeGuests}
          />
        </Field>
        {roomDetails?.animal ? (
          <Field>
            <span>Pets</span>
            <CheckboxNoForm
              checked={isPet}
              onChange={(e) => setIsPet(!isPet)}
            />
          </Field>
        ) : (
          <Field>
            <span>No Pets allow</span>
            <AiFillMinusCircle width={30} height={30} />
          </Field>
        )}
      </div>
      <div className="w-full mt-5">
        <button
          onClick={handleClickReserve}
          className="w-full px-5 py-3 bg-primary text-white rounded-lg hover:bg-primaryHover hover:-translate-y-[1px] shadow-lg shadow-green-400/100"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default RoomDetailReservation;
