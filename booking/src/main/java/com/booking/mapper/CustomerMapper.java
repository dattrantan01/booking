package com.booking.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.booking.dao.entity.Customer;
import com.booking.dto.CustomerDto;
import com.booking.dto.CustomerResponseDto;

@Mapper
public interface CustomerMapper {

	@Mapping(source = "roleId", target = "role.id")
	Customer customerDtoToCustomer(CustomerDto customerDto);

	@InheritInverseConfiguration(name = "customerDtoToCustomer")
	CustomerDto customerToCustomerDto(Customer customer);

	@Mapping(source = "roleName", target = "role.roleName")
	Customer customerResponseDtoToCustomer(CustomerResponseDto customerResponseDto);

	@InheritInverseConfiguration(name = "customerResponseDtoToCustomer")
	CustomerResponseDto customerToCustomerResponseDto(Customer customer);
}
