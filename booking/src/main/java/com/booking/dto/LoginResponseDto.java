package com.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponseDto {
	private final String token;
	private final CustomerResponseDto customerResponseDto;
}
