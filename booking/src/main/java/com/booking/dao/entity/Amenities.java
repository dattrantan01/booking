package com.booking.dao.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.booking.common.enums.Icon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "amenities")
public class Amenities extends BaseEntity{
	@Id
	@GenericGenerator(name = "id_gen", strategy = "com.booking.common.utils.GenerateUUID")
	@GeneratedValue(generator = "id_gen")
	@Column(name = "amenities_id", nullable = false)
	private String id;

	@Column(name = "icon")
	@Enumerated(EnumType.STRING)
	private Icon icon;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "value", nullable = false)
	private String value;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "room_id", nullable = false)
	private Room room;
}
