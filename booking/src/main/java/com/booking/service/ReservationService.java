package com.booking.service;

import java.util.List;

import javax.mail.MessagingException;

import org.springframework.data.crossstore.ChangeSetPersister;

import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;

public interface ReservationService {
	ReservationRequestDto createReservation(ReservationRequestDto reservationDto);

	void updateReservation(String id, String reservationStatsName);

	List<ReservationResponseDto> getByStatusName(String statusName);
	String getFurthestValidDate(String roomId, String from) throws ChangeSetPersister.NotFoundException;

}
