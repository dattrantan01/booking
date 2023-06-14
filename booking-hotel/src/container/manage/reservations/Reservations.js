import React, { useEffect, useState } from 'react';
import http from '../../../config/axiosConfig';
import { PATHS } from '../../../utils/paths';
import { toast } from 'react-toastify';
import Loading from '../../../components/loading/Loading';
import { useAuth } from '../../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import ReservationBooking from '../../reservationBooking/ReservationBooking';
import Empty from '../../../components/empty/Empty';

const Reservations = () => {
    const params = useParams();
    const status = params.status?.toUpperCase();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
  
    useEffect(() => {
      setIsLoading(true);
      http
        .get(`reservations/by-owner/${user?.id}?statusName=${status}`)
        .then((res) => {
          setBookings(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }, [user, status]);
  
    const handleReject = (id) => {
      http.put(`reservations/${id}?reservationStatusName=REJECT`).then(res => {
        toast.success('Reject Successfully');
        navigate(PATHS.bookingsStatus.replace(":status", "reject"))
      })
    }
  
    return (
      <div className="px-5 pt-5 w-full">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-6 w-full">
            {bookings && bookings.length > 0 ? (
              bookings.map((item) => {
                return <ReservationBooking key={item?.id} bookings={item} handleReject={handleReject} />;
              })
            ) : (
              <Empty />
            )}
          </div>
        )}
      </div>
    );
};

export default Reservations;