package com.booking.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.Review;
import com.booking.dao.entity.Room;
import com.booking.dao.repository.ReviewRepository;
import com.booking.dao.repository.RoomRepository;
import com.booking.dto.ReviewDto;
import com.booking.mapper.ReviewMapper;
import com.booking.service.ReviewService;
import com.booking.service.RoomService;

@Service
public class ReviewServiceImpl implements ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private ReviewMapper reviewMapper;

	@Autowired
	private RoomService roomService;

	@Autowired
	private RoomRepository roomRepository;

	@Override public ReviewDto createReview(ReviewDto reviewDto) {
		reviewRepository.save(reviewMapper.reviewDtoToReview(reviewDto));
		Room room = roomService.findById(reviewDto.getRoomId());
		List<Review> reviewList = reviewRepository.findByRoomIdOrderByTimeCreate(reviewDto.getRoomId());
		if (!reviewList.isEmpty()){
			Double sum = reviewList.stream().map(Review::getRating).reduce(0.0, Double::sum);
			double avg = sum / reviewList.size();
			room.setAverageRating( Math.round(avg * 2) / 2.0);
			roomRepository.save(room);
		}
		return reviewDto;
	}
}