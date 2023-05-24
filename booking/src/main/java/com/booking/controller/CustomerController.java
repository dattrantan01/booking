package com.booking.controller;

import java.util.Optional;

import com.booking.dto.CustomerResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.booking.dao.entity.Customer;
import com.booking.dao.repository.CustomerRepository;
import com.booking.dto.CustomerDto;
import com.booking.service.CustomerService;

import javax.servlet.http.HttpServletRequest;
import static com.booking.common.constant.SecurityConstant.HEADER_NAME;

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

	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
		if (request.getHeader(HEADER_NAME) == null){
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		CustomerResponseDto customerResponseDto = customerService.getCurrentUser(request);
		return ResponseEntity.status(HttpStatus.OK).body(customerResponseDto);
	}
}
