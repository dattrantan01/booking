package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Reservation;
import com.booking.dao.repository.ReservationRepository;
import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;
import com.booking.mapper.ReservationMapper;
import com.booking.service.ReservationService;
import com.booking.service.ReservationStatusService;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private ReservationMapper reservationMapper;

	@Autowired
	private ReservationStatusService reservationStatusService;

	@Override
	public ReservationRequestDto createReservation(ReservationRequestDto reservationDto) {
		reservationRepository.save(reservationMapper.reservationRequestDtoToReservation(reservationDto));
		return reservationDto;
	}

	@Override
	public void updateReservation(String id, String reservationStatusName) {
		Reservation reservation = reservationRepository.getReferenceById(id);
		reservation.setReservationStatus(reservationStatusService.findByReservationStatusName(reservationStatusName));
		reservationRepository.save(reservation);
	}

	@Override public List<ReservationResponseDto> getByStatusName(String statusName) {
		return reservationRepository.findByReservationStatusReservationStatusName(statusName).stream().map(reservation -> reservationMapper.reservationToReservationResponseDto(reservation)).collect(
			Collectors.toList());
	}
}
