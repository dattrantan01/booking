package com.booking.service;

import java.util.List;

import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomResponseDto;

public interface RoomService {
	public void createRoom(RoomRequestDto roomRequestDto);
	public List<RoomResponseDto> getAll();
	List<RoomResponseDto> findByCustomerId(String id);
	List<RoomResponseDto> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice);
}
