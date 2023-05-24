package com.booking.service;

import com.booking.dto.CustomerDto;
import com.booking.dto.CustomerResponseDto;

import javax.servlet.http.HttpServletRequest;

public interface CustomerService {
	void createCustomer(CustomerDto customerDto);

	CustomerResponseDto getCurrentUser(HttpServletRequest request);
}
