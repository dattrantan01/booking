package com.booking.service;

import com.booking.dto.RoomTypeDto;

import java.util.List;

public interface RoomTypeService {
    public void createRoomType(RoomTypeDto roomTypeDto);
    public List<RoomTypeDto> getAllRoomType();
}
