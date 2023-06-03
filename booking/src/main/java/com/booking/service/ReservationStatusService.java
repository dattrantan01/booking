package com.booking.service;

import com.booking.dao.entity.ReservationStatus;

public interface ReservationStatusService {
	ReservationStatus findByReservationStatusName(String name);
}
