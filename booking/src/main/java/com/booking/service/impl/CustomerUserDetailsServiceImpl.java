package com.booking.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Customer;
import com.booking.dao.repository.CustomerRepository;
import com.booking.security.CustomerUserDetails;
import com.booking.service.CustomerUserDetailsService;

@Service
public class CustomerUserDetailsServiceImpl implements CustomerUserDetailsService {

	@Autowired
	private CustomerRepository customerRepository;


	@Override
	public UserDetails loadUserByUsername(String email) {
		Optional<Customer> customer = customerRepository.findByEmail(email);
		if (customer.isEmpty()) {
			throw new BadCredentialsException("Customer not valid");
		}
		return new CustomerUserDetails(customer.get());
	}
}
