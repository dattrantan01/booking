package com.booking.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import com.booking.dao.entity.Amenities;
import com.booking.dao.entity.Image;
import com.booking.dao.entity.Room;
import com.booking.dao.entity.RoomType;
import com.booking.dto.ImageDto;
import com.booking.dto.RoomRequestDto;
import com.booking.dto.RoomTypeDto;

public abstract class RoomMapperDecorator implements RoomMapper {

	@Autowired
	@Qualifier("delegate")
	private RoomMapper delegate;

	@Autowired
	private ImageMapper imageMapper;

	@Autowired
	private AmenitiesMapper amenitiesMapper;

	@Override
	public Room roomRequestDtoToRoom(RoomRequestDto roomRequestDto) {
		Room room = delegate.roomRequestDtoToRoom(roomRequestDto);
		List<Image> imageList = roomRequestDto.getImagesDto().stream().map(imageDto -> imageMapper.imageDtoToImage(imageDto)).collect(Collectors.toList());
		List<Amenities> amenitiesList =
			roomRequestDto.getAmenitiesDto().stream().map(amenitiesDto -> amenitiesMapper.amenitiesDtoToAmenities(amenitiesDto)).collect(
				Collectors.toList());
		imageList.forEach(image -> image.setRoom(room));
		amenitiesList.forEach(amenities -> amenities.setRoom(room));
		room.setImages(imageList);
		room.setAmenities(amenitiesList);
		return room;
	}
}
