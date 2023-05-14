package com.booking.service.impl;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.booking.common.utils.JwtUtil;
import com.booking.dao.entity.Customer;
import com.booking.dao.repository.CustomerRepository;
import com.booking.dto.CustomerResponseDto;
import com.booking.dto.LoginRequestDto;
import com.booking.dto.LoginResponseDto;
import com.booking.mapper.CustomerMapper;
import com.booking.security.CustomAuthenticationManager;
import com.booking.service.CustomerUserDetailsService;
import com.booking.service.LoginService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

	private final CustomAuthenticationManager customAuthenticationManager;

	private final CustomerUserDetailsService customerUserDetailsService;

	private final JwtUtil jwtUtil;

	private final CustomerRepository customerRepository;

	private final CustomerMapper customerMapper;

	@Override
	public LoginResponseDto authenticate(LoginRequestDto loginRequestDto) {
		try {
			customAuthenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequestDto.getEmail().trim(),
							loginRequestDto.getPassword()
					)

			);
		} catch (BadCredentialsException e) {
			throw new BadCredentialsException("Incorrect email or password.", e);
		}

		// If authenticate successfully, retrieve logged-in user info and generate token to send back
		final UserDetails userDetails = customerUserDetailsService.loadUserByUsername(loginRequestDto.getEmail()
				                                                                              .trim());
		final String token = jwtUtil.generateToken(userDetails);

		final Customer customer = customerRepository.findByEmail(loginRequestDto.getEmail().trim())
				.orElseThrow(() -> new BadCredentialsException("Incorrect email or password."));
		CustomerResponseDto customerResponseDto = customerMapper.customerToCustomerResponseDto(customer);
		return new LoginResponseDto(token, customerResponseDto);
	}
}
