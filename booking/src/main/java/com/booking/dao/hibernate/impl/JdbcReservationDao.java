package com.booking.dao.hibernate.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.booking.dao.hibernate.ReservationDao;
import com.booking.mapper.DateStatusMapper;
import com.booking.sdo.DateStatus;
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

	@Override
	public List<DateStatus> getDateStatus(String roomId, int month, int year) {
		String reservationStatusId = reservationStatusService.findByReservationStatusName("APPROVED").getId();
		List<DateStatus> ret = new ArrayList<>();
		final String sql = "WITH RECURSIVE days AS\n" +
			"(\n" +
			"   SELECT 1 AS day UNION ALL SELECT day + 1 FROM days WHERE day < DAY(LAST_DAY('" + year + "-" + month + "-01'))\n" +
			")\n" +
			"\n" +
			"SELECT d.day, IF(d.day >= DAY(r.start_date) AND d.day <= DAY(r.end_date),TRUE,FALSE) AS status FROM days AS d\n" +
			"LEFT JOIN reservation AS r\n" +
			"ON (\n" +
			"    d.day >= DAY(r.start_date) AND d.day <= DAY(r.end_date)\n" +
			"    AND r.reservation_status_id = '" + reservationStatusId + "'\n" +
			"    AND MONTH(r.start_date) = " + month + "\n" +
			"    AND YEAR(r.start_date) = " + year + "\n" +
			"    AND r.room_id = '" + roomId + "'\n" +
			")\n" +
			"ORDER BY day\n";
		ret.addAll(jdbcTemplateObject.query(sql, new DateStatusMapper()));
		return ret;
	}

}