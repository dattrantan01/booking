import moment from "moment";
import React, { useState } from "react";
import { FiClipboard } from "react-icons/fi";
import { MdMeetingRoom, MdPeople, MdCalendarToday } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { FaUserPlus, FaDog } from "react-icons/fa";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ReviewModal from "../reviews/ReviewModal";
import http from "../../config/axiosConfig";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../utils/paths";

const ReservationBooking = ({
  id,
  handleReject,
  handlePayment,
  handleApprove,
  handleReviewFromUser,
  bookings,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reviewModal, setReviewModal] = useState(false);
  const startDateShow = moment(bookings?.startDate).format("MM-DD-YYYY");
  const endDateShow = moment(bookings?.endDate).format("MM-DD-YYYY");
  const status = bookings?.reservationStatusName;

  const handleReviews = (id) => {
    setReviewModal(true);
  };

  const handleClose = () => {
    setReviewModal(false);
  };

  const handleReview = (rating, comment) => {
    const review = {
      reservationId: id,
      customerId: user?.id,
      roomId: bookings?.roomId,
      content: comment,
      rating: rating,
    };

    http
      .post("reviews", review)
      .then((res) => {
        setReviewModal(false);
        navigate(PATHS.roomDetails.replace(":id", bookings?.roomId));
        toast.success("Review success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {reviewModal && (
        <ReviewModal handleClose={handleClose} handleReview={handleReview} />
      )}
      <div className="relative z-10 rounded-lg w-full bg-slate-100 px-5 py-5 flex flex-col">
        <div className="mt-5 text-lg">
          <div className="w-full flex flex-row gap-3">
            <div className="w-[150px] h-[150px]">
              <img
                src={bookings?.images?.length && bookings?.images[0]?.url}
                alt=""
                className="object-contain w-full h-full"
              />
            </div>
            <div className="w-[calc(100%-150px)]">
              <div className="w-full grid grid-cols-2">
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdMeetingRoom />
                    <span className="font-semibold">Room name:</span>
                    <Link
                      to={PATHS.roomDetails.replace(":id", bookings?.roomId)}
                      className="hover:text-primary"
                    >
                      {bookings?.roomName}
                    </Link>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdCalendarToday />
                    <span className="font-semibold">Check In Date:</span>
                    <span>{startDateShow}</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdPeople />
                    <span className="font-semibold">Customer:</span>
                    <span>{bookings?.customerName}</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <MdCalendarToday />
                    <span className="font-semibold">Check Out Date:</span>
                    <span>{endDateShow}</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <FaUserPlus />
                    <span className="font-semibold">Persons:</span>
                    <span>{bookings?.quantityPeople}</span>
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
                    <IoMdPricetag />
                    <span className="font-semibold">Total:</span>
                    <span>${bookings?.total}</span>
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
          <div className="w-full flex items-center justify-center gap-4">
            {status === "APPROVED" && handlePayment && (
              <>
                <PayPalScriptProvider
                  options={{
                    "client-id": "test",
                    currency: "USD",
                  }}
                >
                  <PayPalButtons
                    style={{
                      layout: "horizontal",
                      color: "black",
                      tagline: false,
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "" + bookings.total,
                              showSpinner: true,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handlePayment(bookings?.id);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </>
            )}
            {status === "PENDING" && handleApprove && (
              <button
                className="w-full max-w-[150px] px-4 py-2 bg-green-500 text-white shadow-lg rounded-md hover:bg-green-600 hover:-translate-y-[1px] hover:shadow-2xl"
                onClick={() => handleApprove(bookings?.id)}
              >
                Approve
              </button>
            )}
            {status === "PENDING" && (
              <button
                className="max-w-[150px] w-full px-4 py-2 bg-red-500 text-white shadow-lg rounded-md hover:bg-red-600 hover:-translate-y-[1px] hover:shadow-2xl"
                onClick={() => handleReject(bookings?.id)}
              >
                Reject
              </button>
            )}
            {status === "SUCCESS" && handleReviewFromUser && (
              <button
                className="max-w-[300px] w-full px-4 py-2 bg-purple-500 text-white shadow-lg rounded-md hover:bg-purple-600 hover:-translate-y-[1px] hover:shadow-2xl"
                onClick={() => handleReviews(bookings?.id)}
              >
                Help us review your feelings
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationBooking;
