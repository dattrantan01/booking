package com.booking.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class RoomRequestDto {
	private String customerId;
	private String roomName;
	private String description;
	private List<ImageDto> imagesDto;
	private List<UtilitiesDto> utilitiesDto;
	private String amenities;
	private String address;
	private Integer provinceId;
	private Integer districtId;
	private Integer wardId;
	private LocalDateTime timeCreate;
	private LocalDateTime timeUpdate;
}
