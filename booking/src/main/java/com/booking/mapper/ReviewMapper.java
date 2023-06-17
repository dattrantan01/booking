package com.booking.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.booking.dao.entity.Review;
import com.booking.dto.ReviewDto;
import com.booking.dto.ReviewListDto;

@Mapper
public interface ReviewMapper {

	@Mapping(source = "customerId", target = "customer.id")
	@Mapping(source = "roomId", target = "room.id")
	Review reviewDtoToReview(ReviewDto reviewDto);

	@InheritInverseConfiguration(name = "reviewDtoToReview")
	ReviewDto reviewToReviewDto(Review review);

	@Mapping(source = "customer.customerName", target = "customerName")
	@Mapping(source = "room.roomName", target = "roomName")
	@Mapping(source = "timeCreate", target = "timeCreate", dateFormat = "yyyy-MM-dd HH:mm")
	ReviewListDto reviewToReviewListDto(Review review);
}
