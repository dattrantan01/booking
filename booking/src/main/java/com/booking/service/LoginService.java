package com.booking.service;

import com.booking.dto.LoginRequestDto;
import com.booking.dto.LoginResponseDto;

public interface LoginService {
	LoginResponseDto authenticate(LoginRequestDto loginRequestDto);
}
