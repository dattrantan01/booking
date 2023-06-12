package com.booking.dao.hibernate;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

import com.booking.dao.entity.Reservation;
import com.booking.dto.ReservationResponseDto;
import com.booking.sdo.DateStatus;

public interface ReservationDao {
	String getFurthestValidDate(String roomId, String from) throws NotFoundException;
	List<LocalDate> getAllInvalidDates(String roomId) throws NotFoundException;
	List<DateStatus> getDateStatus(String roomId, int month, int year) throws NotFoundException;
	List<Reservation> getByOwnerIdAndStatusName(String ownerId, String statusName);
}
