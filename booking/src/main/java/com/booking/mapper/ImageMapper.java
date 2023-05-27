package com.booking.mapper;

import org.mapstruct.Mapper;

import com.booking.dao.entity.Image;
import com.booking.dto.ImageDto;

@Mapper
public interface ImageMapper {

	Image imageDtoToImage(ImageDto imageDto);

	ImageDto imageToImageDto(Image image);

}
