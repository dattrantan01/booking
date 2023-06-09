package com.booking.dao.hibernate.impl;

import java.util.List;

import javax.persistence.EntityManager;

import com.booking.dao.entity.Customer;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Room;
import com.booking.dao.hibernate.RoomDao;

@Repository
public class RoomDaoImpl implements RoomDao {
	private final String GET_ROOM_FILTER = "SELECT room.*\n" +
		"FROM room\n" +
		"JOIN room_type ON room.room_type_id = room_type.room_type_id\n" +
		"JOIN province ON room.province_id = province.code\n" +
		"WHERE room_type.room_type_id IN (SELECT room_type.room_type_id FROM room_type WHERE room_type.room_type_id = COALESCE(?1, room_type.room_type_id))\n" +
		"AND province.code IN (SELECT province.code FROM province WHERE province.code = COALESCE(?2, province.code))\n" +
		"AND room.room_name LIKE ?3\n" +
		"AND province.name LIKE ?4\n" +
		"AND province.codename LIKE ?4\n" +
		"AND room.enable = 1\n" +
		"AND room.max_quantity_people = COALESCE(?5, room.max_quantity_people)\n" +
		"AND room.animal = COALESCE(?6, room.animal)" +
		"AND room.price > ?7 AND room.price < ?8\n" +
		"ORDER BY room.time_create DESC ";

	private EntityManager entityManager;
	private JdbcTemplate jdbcTemplateObject;

	@Autowired
	public RoomDaoImpl(EntityManager entityManager, JdbcTemplate jdbcTemplateObject) {
		this.entityManager = entityManager;
		this.jdbcTemplateObject = jdbcTemplateObject;
	}

	@Override
	public List<Room> getWithFilter(String typeRoomId, String provinceId, String roomName, String cityName, String minPrice, String maxPrice,
		String maxQuantityPeople, Boolean animal) {
		Double min = 0.0;
		Double max = 1000000.0;
		Session session = entityManager.unwrap((Session.class));
		if (roomName == null)
			roomName = "";
		if (cityName == null)
			cityName = "";
		if (!(minPrice == null)) {
			min = Double.valueOf(minPrice);
		}
		if (!(maxPrice == null)) {
			max = Double.valueOf(maxPrice);
		}
		String list1 = "%" + roomName + "%";
		String list2 = "%" + cityName + "%";

		return session.createNativeQuery(GET_ROOM_FILTER, Room.class).setParameter(1, typeRoomId).setParameter(2, provinceId).setParameter(3, list1)
			.setParameter(4, list2).setParameter(5, maxQuantityPeople).setParameter(6, animal).setParameter(7, min).setParameter(8,max)
			.getResultList();
	}

	@Override
	public List<Customer> findAllByBehavior() {
		String GET_CUSTOMER_BY_BEHAVIOR =
				"select distinct customer.* from Customer join behavior on customer.customer_id = behavior.customer_id where behavior.`time` > 0";
		Session session = entityManager.unwrap((Session.class));
		return session.createNativeQuery(GET_CUSTOMER_BY_BEHAVIOR, Customer.class).getResultList();
	}
}
