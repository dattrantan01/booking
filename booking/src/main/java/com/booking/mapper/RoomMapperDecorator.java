//package com.booking.mapper;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import com.booking.dao.entity.Utilities;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Qualifier;
//
//import com.booking.dao.entity.Image;
//import com.booking.dao.entity.Room;
//import com.booking.dto.RoomRequestDto;
//
//public abstract class RoomMapperDecorator implements RoomMapper {
//
//	@Autowired
//	@Qualifier("delegate")
//	private RoomMapper delegate;
//
//	@Autowired
//	private ImageMapper imageMapper;
//
//	@Autowired
//	private UtilitiesMapper utilitiesMapper;
//
//	@Override
//	public Room roomRequestDtoToRoom(RoomRequestDto roomRequestDto) {
//		Room room = delegate.roomRequestDtoToRoom(roomRequestDto);
//		List<Image> imageList = roomRequestDto.getImagesDto().stream().map(imageDto -> imageMapper.imageDtoToImage(imageDto)).collect(Collectors.toList());
//		List<Utilities> utilitiesList =
//			roomRequestDto.getUtilitiesDto().stream().map(utilitiesDto -> utilitiesMapper.utilitiesDtoToUtilities(utilitiesDto)).collect(
//				Collectors.toList());
//		imageList.forEach(image -> image.setRoom(room));
//		utilitiesList.forEach(utilities -> utilities.setRoom(room));
//		room.setImages(imageList);
//		room.setUtilities(utilitiesList);
//		return room;
//	}
//}
