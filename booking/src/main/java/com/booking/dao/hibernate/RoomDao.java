package com.booking.dao.hibernate;

import java.util.List;

import com.booking.dao.entity.Room;

public interface RoomDao {
	List<Room> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice, String maxQuantityPeople, Boolean animal);
}
