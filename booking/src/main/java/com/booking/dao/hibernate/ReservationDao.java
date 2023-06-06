package com.booking.dao.hibernate;

import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.booking.sdo.DateStatus;

public interface ReservationDao {
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;
	List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException;
}