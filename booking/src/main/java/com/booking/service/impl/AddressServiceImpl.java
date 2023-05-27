package com.booking.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.booking.dao.entity.District;
import com.booking.dao.entity.Province;
import com.booking.dao.entity.Ward;
import com.booking.dao.hibernate.AddressDao;
import com.booking.dao.repository.ProvinceRepository;
import com.booking.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressDao addressDao;

	@Autowired
	private ProvinceRepository provinceRepository;

	@Override public List<Province> getAllProvince() {
		return provinceRepository.findAll();
	}

	@Override public List<District> getByProvinceCode(Integer code) {
		return addressDao.getDistrict(code);
	}

	@Override public List<Ward> getByDistrictCode(Integer code) {
		return addressDao.getWard(code);
	}

	@Override public Province findByCode(Integer code) {
		return provinceRepository.findByCode(code).orElseThrow(() -> new RuntimeException("No province code"));
	}

	@Override public Ward getByWardId(Integer code) {
		return addressDao.getWardById(code);
	}
}
