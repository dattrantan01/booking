package com.booking.dao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reservation_status")
@Getter
@Setter
public class ReservationStatus extends BaseEntity{

	@Id
	@GenericGenerator(name = "id_gen", strategy = "com.booking.common.utils.GenerateUUID")
	@GeneratedValue(generator = "id_gen")
	@Column(name = "reservation_status_id", nullable = false)
	private String id;

	@Column(name = "reservation_status_name", nullable = false)
	private String reservationStatusName;
}
