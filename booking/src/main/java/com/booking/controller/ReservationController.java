package com.booking.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.booking.dao.entity.Reservation;
import com.booking.dao.repository.ReservationRepository;
import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;
import com.booking.service.ReservationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/reservations")
@AllArgsConstructor
public class ReservationController {

	private ReservationService reservationService;

	private ReservationRepository reservationRepository;

	@PostMapping
	public ResponseEntity<ReservationRequestDto> createReservations(@RequestBody ReservationRequestDto reservationDto) {
		return new ResponseEntity<>(reservationService.createReservation(reservationDto), HttpStatus.OK);
	}

	@GetMapping("/{statusName}")
	public ResponseEntity<List<ReservationResponseDto>> getByStatusName(@PathVariable String statusName){
		List<ReservationResponseDto> reservationResponseDtos = reservationService.getByStatusName(statusName);

		return new ResponseEntity<>(reservationResponseDtos, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateReservation(@PathVariable String id, @RequestParam String reservationStatusName) {
		Optional<Reservation> reservationOptional = reservationRepository.findById(id);
		if (reservationOptional.isPresent() && reservationStatusName.equals("PAYING")) {
			Reservation reservationNew = reservationOptional.get();
			boolean check = false;
			List<Reservation>
				reservationList = reservationRepository.findByRoomIdAndReservationStatusReservationStatusName(reservationNew.getRoom().getId(), "APPROVED");
			reservationList.addAll(reservationRepository.findByRoomIdAndReservationStatusReservationStatusName(reservationNew.getRoom().getId(), "PAYING"));

			for (int i = 0; i < reservationList.size(); i++) {
				Reservation reservationOld = reservationList.get(i);
				LocalDate dateStartOld = reservationOld.getStartDate();
				LocalDate dateEndOld = reservationOld.getEndDate();
				LocalDate dateStartNew = reservationNew.getStartDate();
				LocalDate dateEndNew = reservationNew.getEndDate();
				if (dateStartNew.isAfter(dateEndOld)) {
					continue;
				}
				if (dateStartNew.isEqual(dateStartOld) || dateStartNew.isEqual(dateEndOld) || dateEndNew.isEqual(dateStartOld) || dateEndNew.isEqual(
					dateEndOld)) {
					check = true;
					break;
				}
				if (dateStartNew.isBefore(dateStartOld)) {
					if (dateEndNew.isAfter(dateEndOld) || dateEndNew.isAfter(dateStartOld)) {
						check = true;
						break;
					}
				}
				check = true;
				break;
			}
			if (check) {
				return new ResponseEntity<>("The booking date has been duplicated, please check again", HttpStatus.NOT_FOUND);
			}
		}

		reservationService.updateReservation(id, reservationStatusName);
		return new ResponseEntity<>("Success",HttpStatus.OK);
	}
}