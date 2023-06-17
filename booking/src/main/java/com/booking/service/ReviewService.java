package com.booking.service;
import java.util.List;

import com.booking.dto.ReviewDto;
import com.booking.dto.ReviewListDto;

public interface ReviewService {
	ReviewDto createReview(ReviewDto reviewDto);

	List<ReviewListDto> findByRoomId(String roomId);
}
