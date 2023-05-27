package com.booking.dao.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.booking.dao.entity.Province;

@Repository
public interface ProvinceRepository extends JpaRepository<Province, Integer> {
	Optional<Province> findByCode(Integer code);
}
