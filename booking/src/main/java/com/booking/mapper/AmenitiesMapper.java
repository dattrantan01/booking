package com.booking.mapper;

import org.mapstruct.Mapper;

import com.booking.dao.entity.Amenities;
import com.booking.dto.AmenitiesDto;

@Mapper
public interface AmenitiesMapper {

	Amenities amenitiesDtoToAmenities(AmenitiesDto utilityDto);

	AmenitiesDto amenitiesToAmenitiesDto(Amenities utility);
}
