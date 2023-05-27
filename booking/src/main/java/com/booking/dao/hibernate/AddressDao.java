package com.booking.dao.hibernate;

import java.util.List;

import com.booking.dao.entity.District;
import com.booking.dao.entity.Ward;

public interface AddressDao {
	List<District> getDistrict(Integer provinceCode);
	List<Ward> getWard(Integer districtCode);
	Ward getWardById(Integer code);
}
