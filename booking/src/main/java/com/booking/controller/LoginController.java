package com.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.dto.LoginRequestDto;
import com.booking.dto.LoginResponseDto;
import com.booking.service.LoginService;

@RestController
@RequestMapping("api/auth")
class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping("/login")
	public ResponseEntity<LoginResponseDto> authenticate(@RequestBody LoginRequestDto loginRequestDto) {
		LoginResponseDto loginResponseDto = loginService.authenticate(loginRequestDto);

		return new ResponseEntity<>(loginResponseDto, HttpStatus.OK);
	}

}