package com.booking.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomResponseDto {
	private String id;
	private String customerName;
	private String roomName;
	private String description;
	private String roomTypeName;
	private String roomTypeId;
	private String address;
	private Double averageRating;
	private Double price;
	private Integer maxQuantityPeople;
	private String provinceName;
	private Integer provinceId;
	private String districtName;
	private Integer districtId;
	private String wardName;
	private Integer wardId;
	private Boolean animal;
	private Boolean enable;
	List<ReviewDto> reviewDtos;
	List<ImageDto> imageDtos;
	List<UtilitiesDto> utilitiesDtos;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime timeCreate;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private LocalDateTime timeUpdate;
}
