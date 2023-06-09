package com.booking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ReservationRequestDto {
	private String id;
	private String roomId;
	private String customerId;
	private String reservationStatusId = "eT4CxDVeDhP4TsF";
	private Double averageRating;
	private Integer quantityPeople;
	private Boolean animal;
	private String startDate;
	private String endDate;
	private Double total;
	private Double fee;
	private LocalDateTime timeCreate;
	private LocalDateTime timeUpdate;
}
