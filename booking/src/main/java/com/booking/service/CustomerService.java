package com.booking.service;

import com.booking.dto.CustomerDto;
import com.booking.dto.CustomerResponseDto;
import com.booking.dto.RoomRequestDto;

import javax.servlet.http.HttpServletRequest;

public interface CustomerService {
	void createCustomer(CustomerDto customerDto);

	void updateCustomer(String id, CustomerDto customerDto);

	CustomerResponseDto getCurrentUser(HttpServletRequest request);
}
