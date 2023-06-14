package com.booking.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

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
public class ReservationResponseDto {
	private String id;
	private String roomId;
	private String reservationStatusName;
	private String customerName;
	private String email;
	private String phoneNumber;
	private String roomName;
	private String address;
	private String provinceName;
	private Double total;
	private Integer quantityPeople;
	private Boolean animal;
	private Boolean reviewed;
	private String startDate;
	private String endDate;
	private List<ImageDto> images;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime timeCreate;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime timeUpdate;
}
