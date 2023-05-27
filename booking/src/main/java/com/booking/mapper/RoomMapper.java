package com.booking.mapper;

import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.booking.dao.entity.Room;
import com.booking.dao.entity.RoomType;
import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomTypeDto;

@Mapper
@DecoratedWith(RoomMapperDecorator.class)
public interface RoomMapper {

	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "provinceId", target = "province.code")
	@Mapping(source = "districtId", target = "district.code")
	@Mapping(source = "wardId", target = "ward.code")
	Room roomRequestDtoToRoom(RoomRequestDto roomRequestDto);
}
