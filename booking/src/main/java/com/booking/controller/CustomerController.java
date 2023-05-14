package com.booking.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.dao.entity.Customer;
import com.booking.dao.repository.CustomerRepository;
import com.booking.dto.CustomerDto;
import com.booking.service.CustomerService;

@RestController
@RequestMapping("/api/v1/users")
public class CustomerController {

	@Autowired
	private CustomerService customerService;

	@Autowired
	private CustomerRepository customerRepository;

	@PostMapping
	public ResponseEntity<String> createCustomer(@RequestBody CustomerDto customerDto) {
		Optional<Customer> customerOptional = customerRepository.findByEmail(customerDto.getEmail());
		if (customerOptional.isPresent()) {
			return new ResponseEntity<>("Email already exists", HttpStatus.NOT_FOUND);
		}
		customerService.createCustomer(customerDto);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
}
