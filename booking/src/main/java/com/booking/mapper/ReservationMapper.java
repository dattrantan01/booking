package com.booking.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.booking.dao.entity.Reservation;
import com.booking.dto.ReservationRequestDto;

@Mapper
public interface ReservationMapper {

	@Mapping(source = "roomId", target = "room.id")
	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "reservationStatusId", target = "reservationStatus.id")
	@Mapping(source = "startDate", target = "startDate", dateFormat = "yyyy-MM-dd")
	@Mapping(source = "endDate", target = "endDate", dateFormat = "yyyy-MM-dd")
	Reservation reservationRequestDtoToReservation(ReservationRequestDto reservationDto);


}
