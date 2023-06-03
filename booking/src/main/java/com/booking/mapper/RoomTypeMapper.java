package com.booking.mapper;

import com.booking.dao.entity.RoomType;
import com.booking.dto.RoomTypeDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface RoomTypeMapper {

    @Mapping(source = "id", target = "id")
    RoomType roomTypeDtoToRoomType(RoomTypeDto roomTypeDto);

    @Mapping(source = "id", target = "id")
    RoomTypeDto roomTypeToRoomTypeDto(RoomType roomType);
}
