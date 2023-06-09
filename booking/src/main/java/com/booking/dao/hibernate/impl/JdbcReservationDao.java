package com.booking.dao.hibernate.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Reservation;
import com.booking.dao.hibernate.ReservationDao;
import com.booking.dto.ReservationResponseDto;
import com.booking.mapper.DateMapper;
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
		String reservationStatusId = reservationStatusService.findByReservationStatusName("SUCCESS").getId();
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
	public List<LocalDate> getAllInvalidDates(String roomId) throws ChangeSetPersister.NotFoundException {
		String reservationStatusId = reservationStatusService.findByReservationStatusName("SUCCESS").getId();
		List<LocalDate> ret = new ArrayList<>();
		final String sql = "SELECT DISTINCT gen_date AS date FROM \n" +
			"(SELECT ADDDATE('1970-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) gen_date FROM\n" +
			" (SELECT 0 t0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t0,\n" +
			" (SELECT 0 t1 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t1,\n" +
			" (SELECT 0 t2 union SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t2,\n" +
			" (SELECT 0 t3 union SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t3,\n" +
			" (SELECT 0 t4 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) t4) v\n" +
			"JOIN reservation ON \n" +
			"gen_date >= DATE(start_date) AND gen_date <= DATE(end_date)\n" +
			"AND room_id = '" + roomId + "'\n" +
			"AND reservation_status_id = '" + reservationStatusId + "'\n" +
			"ORDER BY date";
		System.out.println(sql);
		try {
			ret.addAll(jdbcTemplateObject.query(sql, new DateMapper()));
		} catch (Exception e) {
			System.out.println("error : " + e.getMessage());
		}
		return ret;
	}

	@Override
	public List<DateStatus> getDateStatus(String roomId, int month, int year) {
		String reservationStatusId = reservationStatusService.findByReservationStatusName("SUCCESS").getId();
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

	@Override public List<Reservation> getByOwnerIdAndStatusName(String ownerId, String statusName) {
		final String GET_BY_OWNER_ID_AND_STATUS_NAME =
			"SELECT reservation.* FROM reservation\n" +
				"JOIN room ON reservation.room_id = room.room_id\n" +
				"JOIN customer ON room.customer_id = customer.customer_id\n" +
				"JOIN reservation_status ON reservation_status.reservation_status_id = reservation.reservation_status_id\n" +
				"WHERE room.customer_id = ?1 AND reservation.enable = 1\n AND reservation_status.reservation_status_name = ?2\n" +
				"ORDER BY reservation.time_create DESC";
		Session session = entityManager.unwrap((Session.class));
		return session.createNativeQuery(GET_BY_OWNER_ID_AND_STATUS_NAME, Reservation.class).setParameter(1, ownerId).setParameter(2, statusName).getResultList();
	}
}
