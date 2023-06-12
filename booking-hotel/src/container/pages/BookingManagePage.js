import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../config/axiosConfig";
import Loading from "../../components/loading/Loading";
import Empty from "../../components/empty/Empty";
import ReservationBooking from "../reservationBooking/ReservationBooking";

const BookingManagePage = () => {
  const params = useParams();
  const status = params.status;
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    http
      .get(`reservations/${status}`)
      .then((res) => {
        setBookings(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [status]);

  return (
    <div className="px-5 pt-5 w-full">
      <ReservationBooking />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 w-full">
          {bookings && bookings.length > 0 ? (
            bookings.map((item) => {
              return <></>;
            })
          ) : (
            <Empty />
          )}
        </div>
      )}
    </div>
  );
};

export default BookingManagePage;
