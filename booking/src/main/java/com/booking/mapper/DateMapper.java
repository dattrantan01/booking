package com.booking.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

import org.springframework.jdbc.core.RowMapper;

public class DateMapper implements RowMapper<LocalDate> {
    @Override
    public LocalDate mapRow(ResultSet rs, int rowNum) throws SQLException {
        return rs.getDate("date").toLocalDate();
    }
}
