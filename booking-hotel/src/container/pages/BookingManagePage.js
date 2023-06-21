import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../config/axiosConfig";
import Loading from "../../components/loading/Loading";
import Empty from "../../components/empty/Empty";
import ReservationBooking from "../reservationBooking/ReservationBooking";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { PATHS } from "../../utils/paths";

const BookingManagePage = () => {
  const params = useParams();
  const status = params.status?.toUpperCase();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  console.log("bookings", bookings);
  useEffect(() => {
    setIsLoading(true);
    http
      .get(`reservations/by-customer/${user?.id}?statusName=${status}`)
      .then((res) => {
        setBookings(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [status, user]);

  const handleReject = (id) => {
    http.put(`reservations/${id}?reservationStatusName=REJECT`).then((res) => {
      toast.success("Reject Successfully");
      navigate(PATHS.bookingsStatus.replace(":status", "reject"));
    });
  };

  const handlePayment = (id) => {
    http.put(`reservations/${id}?reservationStatusName=SUCCESS`).then((res) => {
      toast.success("Payment Successfully");
      navigate(PATHS.bookingsStatus.replace(":status", "success"));
    });
  };

  return (
    <div className="px-5 pt-5 w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-6 w-full">
          {bookings && bookings.length > 0 ? (
            bookings.map((item) => {
              return (
                <ReservationBooking
                  key={item?.id}
                  id={item?.id}
                  bookings={item}
                  handlePayment={handlePayment}
                  handleReject={handleReject}
                  handleReviewFromUser={true}
                />
              );
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
