package com.booking.dao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
}
