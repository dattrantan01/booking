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
@Table(name = "role")
@Getter
@Setter
public class Role extends BaseEntity{

	@Id
	@GenericGenerator(name = "id_gen", strategy = "com.booking.common.utils.GenerateUUID")
	@GeneratedValue(generator = "id_gen")
	@Column(name = "role_id")
	private String id;

	@Column(name = "role_name", nullable = false)
	private String roleName;
}
