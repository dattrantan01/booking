package com.booking.service;

import java.util.List;

import com.booking.dao.entity.District;
import com.booking.dao.entity.Province;
import com.booking.dao.entity.Ward;

public interface AddressService {
	List<Province> getAllProvince();
	List<District> getByProvinceCode(Integer code);
	List<Ward> getByDistrictCode(Integer code);
	Province findByCode(Integer code);
	Ward getByWardId(Integer code);
}
