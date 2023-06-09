package com.booking.mapper;

import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.booking.dao.entity.Room;
import com.booking.dao.entity.RoomType;
import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomResponseDto;
import com.booking.dto.RoomTypeDto;

@Mapper
//@DecoratedWith(RoomMapperDecorator.class=-4
public interface RoomMapper {

	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "imagesDto", target = "images")
	@Mapping(source = "utilitiesDto", target = "utilities")
	@Mapping(source = "roomTypeId", target = "roomType.id" )
	@Mapping(source = "provinceId", target = "province.code")
	@Mapping(source = "districtId", target = "district.code")
	@Mapping(source = "wardId", target = "ward.code")
	Room roomRequestDtoToRoom(RoomRequestDto roomRequestDto);

	@Mapping(source = "customer.customerName", target = "customerName")
	@Mapping(source = "roomType.name", target = "roomTypeName")
	@Mapping(source = "roomType.id", target = "roomTypeId")
	@Mapping(source = "utilities", target = "utilitiesDtos")
	@Mapping(source = "images", target = "imageDtos")
	@Mapping(source = "province.name", target = "provinceName")
	@Mapping(source = "district.name", target = "districtName")
	@Mapping(source = "province.code", target = "provinceId")
	@Mapping(source = "district.code", target = "districtId")
	@Mapping(source = "ward.code", target = "wardId")
	RoomResponseDto roomToRoomResponseDto(Room room);
}
