package com.booking.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.repository.RoomRepository;
import com.booking.dto.RoomRequestDto;
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


}
