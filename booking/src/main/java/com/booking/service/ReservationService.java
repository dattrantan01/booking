package com.booking.service;

import java.util.List;

import javax.mail.MessagingException;

import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;

public interface ReservationService {
	ReservationRequestDto createReservation(ReservationRequestDto reservationDto);

	void updateReservation(String id, String reservationStatsName);

	List<ReservationResponseDto> getByStatusName(String statusName);

}
