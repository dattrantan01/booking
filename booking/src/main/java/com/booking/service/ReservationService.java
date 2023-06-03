package com.booking.service;

import com.booking.dto.ReservationRequestDto;

public interface ReservationService {
	ReservationRequestDto createReservation(ReservationRequestDto reservationDto);
}
