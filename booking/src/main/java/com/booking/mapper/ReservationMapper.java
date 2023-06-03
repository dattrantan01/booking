package com.booking.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.booking.dao.entity.Reservation;
import com.booking.dto.ReservationRequestDto;
import com.booking.dto.ReservationResponseDto;

@Mapper
public interface ReservationMapper {

	@Mapping(source = "roomId", target = "room.id")
	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "reservationStatusId", target = "reservationStatus.id")
	@Mapping(source = "startDate", target = "startDate", dateFormat = "yyyy-MM-dd")
	@Mapping(source = "endDate", target = "endDate", dateFormat = "yyyy-MM-dd")
	Reservation reservationRequestDtoToReservation(ReservationRequestDto reservationDto);


	@Mapping(source = "reservationStatus.reservationStatusName", target = "reservationStatusName")
	@Mapping(source = "customer.customerName", target = "customerName")
	@Mapping(source = "customer.email", target = "email")
	@Mapping(source = "customer.phoneNumber", target = "phoneNumber")
	@Mapping(source = "room.roomName", target = "roomName")
	@Mapping(source = "room.address", target = "address")
	@Mapping(source = "room.province.name", target = "provinceName")
	@Mapping(source = "room.images", target = "images")
	@Mapping(source = "startDate", target = "startDate", dateFormat = "yyyy-MM-dd")
	@Mapping(source = "endDate", target = "endDate", dateFormat = "yyyy-MM-dd")
	ReservationResponseDto reservationToReservationResponseDto(Reservation reservation);
}
