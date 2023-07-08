package com.booking.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
	List<Reservation> findByRoomIdAndReservationStatusReservationStatusName(String roomId, String reservationStatusName);
	List<Reservation> findByReservationStatusReservationStatusNameAndCustomerIdOrderByTimeCreateDesc(String reservationStatusName, String customerId);
}
