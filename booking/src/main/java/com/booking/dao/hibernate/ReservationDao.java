package com.booking.dao.hibernate;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

public interface ReservationDao {
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;
}
