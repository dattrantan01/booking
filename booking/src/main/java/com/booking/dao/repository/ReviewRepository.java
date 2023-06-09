package com.booking.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
	List<Review> findByRoomIdOrderByTimeCreate(String roomId);
	List<Review> findByCustomerId(String id);
	List<Review> findReviewByCustomerIdAndRoomId(String customerId, String roomId);
}
