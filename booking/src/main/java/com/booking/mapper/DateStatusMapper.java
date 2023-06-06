package com.booking.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.booking.sdo.DateStatus;


public class DateStatusMapper implements RowMapper<DateStatus> {
	@Override
	public DateStatus mapRow(ResultSet rs, int rowNum) throws SQLException {
		DateStatus dateStatus = new DateStatus();
		dateStatus.setDay(rs.getInt("day"));
		dateStatus.setStatus(rs.getBoolean("status"));
		return dateStatus;
	}
}
