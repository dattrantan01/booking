package com.booking.dao.hibernate.impl;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.booking.dao.hibernate.ReservationDao;
import com.booking.service.ReservationStatusService;

@Repository
public class JdbcReservationDao implements ReservationDao {

	private JdbcTemplate jdbcTemplateObject;
	private EntityManager entityManager;

	@Autowired
	public JdbcReservationDao(JdbcTemplate jdbcTemplateObject, EntityManager entityManager) {
		this.entityManager = entityManager;
		this.jdbcTemplateObject = jdbcTemplateObject;
	}

	@Autowired
	private ReservationStatusService reservationStatusService;

	@Override
	public String getFurthestValidDate(String roomId, String from) {
		String reservationStatusId = reservationStatusService.findByReservationStatusName("APPROVED").getId();
		final String GET_FURTHEST_VALID_DATE = "SELECT DATE(start_date) - INTERVAL 1 DAY AS furthest_date FROM reservation \n" +
			"WHERE room_id = '" + roomId + "'\n" +
			"AND DATE('" + from + "') < DATE(start_date)\n" +
			"AND reservation_status_id = '" + reservationStatusId + "' \n" +
			"ORDER BY DATE(start_date)\n" +
			"LIMIT 1\n";
		String ret = "2069-12-31";
		try {
			ret = jdbcTemplateObject.queryForObject(GET_FURTHEST_VALID_DATE, String.class);
		} catch (Exception e) {
			System.out.println("dont have furthest valid date");
		}
		return ret;
	}

}
