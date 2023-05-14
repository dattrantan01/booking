package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.booking.common.utils.JwtUtil;
import com.booking.dao.entity.Customer;
import com.booking.dao.repository.CustomerRepository;
import com.booking.dto.CustomerDto;
import com.booking.dto.CustomerResponseDto;
import com.booking.mapper.CustomerMapper;
import com.booking.service.CustomerService;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private CustomerMapper customerMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void createCustomer(CustomerDto customerDto) {
		customerDto.setPassword(passwordEncoder.encode(customerDto.getPassword()));
		Customer customer = customerMapper.customerDtoToCustomer(customerDto);
		customerRepository.save(customer);
	}
}
