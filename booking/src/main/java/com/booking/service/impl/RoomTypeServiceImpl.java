package com.booking.service.impl;

import com.booking.dao.entity.RoomType;
import com.booking.dao.repository.RoomTypeRepository;
import com.booking.dto.RoomTypeDto;
import com.booking.mapper.RoomTypeMapper;
import com.booking.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private RoomTypeMapper roomTypeMapper;

    @Override
    public void createRoomType(RoomTypeDto roomTypeDto) {
        RoomType roomType = roomTypeMapper.roomTypeDtoToRoomType(roomTypeDto);
        roomTypeRepository.save(roomType);
    }

    @Override
    public List<RoomTypeDto> getAllRoomType() {
        return roomTypeRepository.findAll().stream().map(roomType -> roomTypeMapper.roomTypeToRoomTypeDto(roomType)).collect(
                Collectors.toList());
    }


}
