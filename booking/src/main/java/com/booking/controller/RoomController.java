package com.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

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

	@GetMapping("/room-filter")
	public ResponseEntity<List<RoomResponseDto>> getWithFilter(@RequestParam(required = false) String typeRoomId,
		@RequestParam(required = false) String provinceId, @RequestParam(required = false) String roomName,
		@RequestParam(required = false) String cityName,
		@RequestParam(required = false) String minPrice, @RequestParam(required = false) String maxPrice,
		@RequestParam(required = false) String maxQuantityPeople, @RequestParam(required = false) Boolean animal) {
		List<RoomResponseDto> rooms = roomService.getWithFilter(typeRoomId, provinceId, roomName, cityName, minPrice, maxPrice,maxQuantityPeople, animal);
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

	@GetMapping("/{roomId}")
	public ResponseEntity<RoomResponseDto> getDetail(@PathVariable String roomId, @RequestParam(required = false) String customerId) {
		RoomResponseDto roomResponseDto = roomService.findByRoomId(roomId, customerId);
		return ResponseEntity.status(HttpStatus.OK).body(roomResponseDto);
	}

	@GetMapping("/get-by-customer-id/{id}")
	public ResponseEntity<List<RoomResponseDto>> getByCustomerId(@PathVariable String id) {
		List<RoomResponseDto> rooms = roomService.findByCustomerId(id);
		return new ResponseEntity<>(rooms, HttpStatus.OK);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateRoom(@PathVariable String id, @RequestBody RoomRequestDto roomRequestDto){
		roomService.updateRoom(id,roomRequestDto);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@GetMapping("/favorite/customer/{id}")
	public ResponseEntity<List<RoomResponseDto>> favorite(@PathVariable(required = false) String id){
		return new ResponseEntity<>(roomService.favoriteRoom(id), HttpStatus.OK);
	}
}
