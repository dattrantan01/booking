package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Room;
import com.booking.dao.repository.RoomRepository;
import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomResponseDto;
import com.booking.mapper.RoomMapper;
import com.booking.service.RoomService;

@Service
public class RoomServiceImpl implements RoomService {

	@Autowired
	private RoomRepository roomRepository;

	@Autowired
	private RoomMapper roomMapper;

	@Override
	public void createRoom(RoomRequestDto roomRequestDto) {
		roomRepository.save(roomMapper.roomRequestDtoToRoom(roomRequestDto));
	}

	@Override public List<RoomResponseDto> getAll() {
		return roomRepository.findAll().stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
	}

}
