package com.booking.dao.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Behavior;

@Repository
public interface BehaviorRepository extends JpaRepository<Behavior, String> {
	Optional<Behavior> findByCustomerIdAndRoomId(String customerId, String roomId);
	List<Behavior> findByCustomerId(String customerId);
	List<Behavior> findByRoomId(String roomId);
}
