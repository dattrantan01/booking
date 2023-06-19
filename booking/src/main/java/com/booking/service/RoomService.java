package com.booking.service;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.multipart.MultipartFile;

import com.booking.dao.entity.Room;
import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomResponseDto;

public interface RoomService {
	public void createRoom(RoomRequestDto roomRequestDto);
	public List<RoomResponseDto> getAll();
	Room findById(String id);
	RoomResponseDto findByRoomId(String roomId, String customerId);
	List<RoomResponseDto> findByCustomerId(String id);
	List<RoomResponseDto> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice, String maxQuantityPeople, Boolean animal);
	void updateRoom(String id, RoomRequestDto roomCreateDto);
	List<RoomResponseDto> favoriteRoom(String id);
}
