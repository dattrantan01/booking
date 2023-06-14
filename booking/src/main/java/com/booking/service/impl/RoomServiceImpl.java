package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Room;
import com.booking.dao.hibernate.RoomDao;
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
	@Autowired
	private RoomDao roomDao;

	@Override
	public void createRoom(RoomRequestDto roomRequestDto) {
		roomRepository.save(roomMapper.roomRequestDtoToRoom(roomRequestDto));
	}

	@Override public List<RoomResponseDto> getAll() {
		return roomRepository.findAll().stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
	}

	@Override
	public Room findById(String id) {
		return roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found room"));
	}

	@Override
	public RoomResponseDto findByRoomId(String roomId, String customerId) {
		Room room = findById(roomId);
//		if (customerId != null) {
//			Optional<Behavior> behaviorOptional = behaviorRepository.findByCustomerIdAndRoomId(customerId, roomId);
//			if (behaviorOptional.isPresent()) {
//				Behavior behavior = behaviorOptional.get();
//				behavior.setTime(behavior.getTime() + 1);
//				behaviorRepository.save(behavior);
//			} else {
//				Behavior newBehavior = new Behavior();
//				newBehavior.setTime(1);
//				newBehavior.setRoom(room);
//				newBehavior.setCustomer(customerRepository.findById(customerId).orElseThrow());
//				behaviorRepository.save(newBehavior);
//			}
//		}
		return roomMapper.roomToRoomResponseDto(room);
	}

	@Override
	public List<RoomResponseDto> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice, String maxQuantityPeople, Boolean animal) {
		return roomDao.getWithFilter(typeRoomId, provinceId, roomName, cityName, minPrice, maxPrice,maxQuantityPeople,animal).stream().map(room -> roomMapper.roomToRoomResponseDto(room))
			.collect(Collectors.toList());
	}
	@Override
	public List<RoomResponseDto> findByCustomerId(String id) {
		return roomRepository.getByCustomerIdAndEnableIsTrueOrderByTimeCreateDesc(id).stream().map(room -> roomMapper.roomToRoomResponseDto(room)).collect(Collectors.toList());
	}


}
