package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Reservation;
import com.booking.dao.hibernate.ReservationDao;
import com.booking.dao.repository.ReservationRepository;
import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;
import com.booking.mapper.ReservationMapper;
import com.booking.sdo.DateStatus;
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

	@Autowired
	private ReservationDao reservationDao;

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

	@Override
	public String getFurthestValidDate(String roomId, String from) throws ChangeSetPersister.NotFoundException {
		return reservationDao.getFurthestValidDate(roomId, from);
	}

	@Override
	public List<DateStatus> getDateStatus(String roomId, int month, int year) throws ChangeSetPersister.NotFoundException {
		return reservationDao.getDateStatus(roomId, month, year);
	}
}
