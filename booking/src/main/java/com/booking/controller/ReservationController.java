package com.booking.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.dto.ReservationRequestDto;
import com.booking.service.ReservationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/reservations")
@AllArgsConstructor
public class ReservationController {

	private ReservationService reservationService;

	@PostMapping
	public ResponseEntity<ReservationRequestDto> createReservations(@RequestBody ReservationRequestDto reservationDto) {
		return new ResponseEntity<>(reservationService.createReservation(reservationDto), HttpStatus.OK);
	}
}