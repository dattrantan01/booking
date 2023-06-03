package com.booking.controller;

import com.booking.dao.entity.District;
import com.booking.dao.entity.Province;
import com.booking.dao.entity.Ward;
import com.booking.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    @GetMapping("/provinces")
    public ResponseEntity<List<Province>> getAllProvinces() {
        List<Province> provinces = addressService.getAllProvince();
        return new ResponseEntity<>(provinces, HttpStatus.OK);
    }

    @GetMapping("/districts/{code}")
    public ResponseEntity<List<District>> getByProvinceCode(@PathVariable Integer code) {
        List<District> districts = addressService.getByProvinceCode(code);
        return new ResponseEntity<>(districts, HttpStatus.OK);
    }

    @GetMapping("/wards/{code}")
    public ResponseEntity<List<Ward>> getByDistrictCode(@PathVariable Integer code) {
        List<Ward> districts = addressService.getByDistrictCode(code);
        return new ResponseEntity<>(districts, HttpStatus.OK);
    }

    @GetMapping("/wards/get-by-ward-id/{code}")
    public ResponseEntity<Ward> getByWardCode(@PathVariable Integer code) {
        Ward ward = addressService.getByWardId(code);
        return new ResponseEntity<>(ward, HttpStatus.OK);
    }
}
