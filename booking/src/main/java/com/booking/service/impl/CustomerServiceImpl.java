package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.booking.common.utils.JwtUtil;
import com.booking.dao.entity.Customer;
import com.booking.dao.repository.CustomerRepository;
import com.booking.dto.CustomerDto;
import com.booking.dto.CustomerResponseDto;
import com.booking.mapper.CustomerMapper;
import com.booking.service.CustomerService;

import javax.servlet.http.HttpServletRequest;

import static com.booking.common.constant.SecurityConstant.HEADER_NAME;
import static com.booking.common.constant.SecurityConstant.TOKEN_PREFIX;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	@Autowired
	private CustomerMapper customerMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	public void createCustomer(CustomerDto customerDto) {
		customerDto.setPassword(passwordEncoder.encode(customerDto.getPassword()));
		Customer customer = customerMapper.customerDtoToCustomer(customerDto);
		customerRepository.save(customer);

	}

	@Override
	public void updateCustomer(String id, CustomerDto customerDto) {
		Customer customer = customerMapper.customerDtoToCustomer(customerDto);
		if (customerDto.getPassword() == null) {
			String password = customerRepository.findByEmail(customerDto.getEmail()).get().getPassword();
			customer.setPassword(password);
		}
		customerRepository.save(customer);
	}

	@Override
	public CustomerResponseDto getCurrentUser(HttpServletRequest request) {
		String authorizationHeader = request.getHeader(HEADER_NAME);
		String token = authorizationHeader.substring(TOKEN_PREFIX.length());
		String email = jwtUtil.getUsernameFromToken(token);
		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Not found user"));
		return customerMapper.customerToCustomerResponseDto(customer);
	}

}
