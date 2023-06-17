package com.booking.dao.entity;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.mapping.Map;
import org.mapstruct.Mapping;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "review")
public class Review extends BaseEntity{
	@Id
	@GenericGenerator(name = "id_gen", strategy = "com.booking.common.utils.GenerateUUID")
	@GeneratedValue(generator = "id_gen")
	@Column(name = "review_id", nullable = false)
	private String id;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "customer_id", nullable = false)
	private Customer customer;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	private Room room;

	@Column(name = "rating")
	private Double rating;

	@Column(name = "is_reviewed")
	private Boolean isReviewed;

	@Lob
	@Column(name = "content")
	private String content;

	@Column(name = "enable")
	private Boolean enable = true;

	@Override
	public boolean equals(Object o){
		if (this == o) {
			return true;
		}
		if (!(o instanceof Review)){
			return false;
		}
		Review review = (Review) o;
		return Objects.equals(id, review.id) && Objects.equals(rating, review.rating);
	}

	@Override
	public int hashCode(){
		return Objects.hash(id, rating);
	}
}