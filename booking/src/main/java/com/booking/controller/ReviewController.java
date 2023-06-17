package com.booking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.booking.dto.ReviewDto;
import com.booking.dto.ReviewListDto;
import com.booking.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;

	@PostMapping
	public ResponseEntity<ReviewDto> createReview(@RequestBody ReviewDto reviewDto) {
		reviewService.createReview(reviewDto);
		return new ResponseEntity<>(reviewDto, HttpStatus.OK);
	}

	@GetMapping("/rooms/{id}")
	public ResponseEntity<List<ReviewListDto>> getByRoomId(@PathVariable String id){
		List<ReviewListDto> reviewDtos = reviewService.findByRoomId(id);
		return new ResponseEntity<>(reviewDtos, HttpStatus.OK);
	}

}
