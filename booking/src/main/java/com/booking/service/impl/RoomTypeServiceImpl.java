package com.booking.service.impl;

import com.booking.dao.entity.RoomType;
import com.booking.dao.repository.RoomTypeRepository;
import com.booking.dto.RoomTypeDto;
import com.booking.mapper.RoomTypeMapper;
import com.booking.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
