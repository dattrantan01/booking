package com.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomResponseDto;
import com.booking.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

	@Autowired
	private RoomService roomService;

	@PostMapping
	public ResponseEntity<RoomRequestDto> createRoom(@RequestBody RoomRequestDto roomRequestDto) {
		roomService.createRoom(roomRequestDto);
		return new ResponseEntity<>(roomRequestDto, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<List<RoomResponseDto>> getAllRoom() {
		List<RoomResponseDto> rooms = roomService.getAll();
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

}
