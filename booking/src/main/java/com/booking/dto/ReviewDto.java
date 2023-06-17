package com.booking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReviewDto {
	private String id;
	private String customerId;
	private String roomId;
	private String content;
	private Boolean isReviewed = false;
	private Double rating;
}
