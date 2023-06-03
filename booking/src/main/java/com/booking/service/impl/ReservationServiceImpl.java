package com.booking.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.repository.ReservationRepository;
import com.booking.dto.ReservationRequestDto;
import com.booking.mapper.ReservationMapper;
import com.booking.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService {

	@Autowired
	private ReservationRepository reservationRepository;

	@Autowired
	private ReservationMapper reservationMapper;

	@Override
	public ReservationRequestDto createReservation(ReservationRequestDto reservationDto) {
		reservationRepository.save(reservationMapper.reservationRequestDtoToReservation(reservationDto));
		return reservationDto;
	}
}
