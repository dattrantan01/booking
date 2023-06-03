package com.booking.dao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
	List<Room> getByCustomerIdAndEnableIsTrueOrderByTimeCreateDesc(String id);
}
