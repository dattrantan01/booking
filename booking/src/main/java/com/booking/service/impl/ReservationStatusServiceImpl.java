package com.booking.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.ReservationStatus;
import com.booking.dao.repository.ReservationStatusRepository;
import com.booking.service.ReservationStatusService;

@Service
public class ReservationStatusServiceImpl implements ReservationStatusService {

	@Autowired
	private ReservationStatusRepository reservationStatusRepository;

	@Override
	public ReservationStatus findByReservationStatusName(String name) {
		return reservationStatusRepository.findByReservationStatusName(name).orElseThrow(() -> new RuntimeException("Not found status name"));
	}
}
