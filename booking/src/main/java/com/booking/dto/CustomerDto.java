package com.booking.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
	private String id;
	private String customerName;
	private String email;
	private String password;
	private String phoneNumber;
	private String roleId;
	private LocalDateTime timeCreate;
	private LocalDateTime timeUpdate;
}
