package com.booking.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister;

import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;
import com.booking.sdo.DateStatus;

public interface ReservationService {
	ReservationRequestDto createReservation(ReservationRequestDto reservationDto);

	void updateReservation(String id, String reservationStatsName);

	List<ReservationResponseDto> getByCustomerIdAndStatusName(String statusName, String customerId);
	List<ReservationResponseDto> getByOwnerIdAndStatusName(String ownerId, String statusName);
	List<LocalDate> getAllInvalidDate(String roomId) throws ChangeSetPersister.NotFoundException;
	String getFurthestValidDate(String roomId, String from) throws ChangeSetPersister.NotFoundException;
	List<DateStatus> getDateStatus(String roomId, int month, int year) throws ChangeSetPersister.NotFoundException;
	ReservationResponseDto getById(String id);
}

