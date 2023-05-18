package com.booking.controller;

import com.booking.dto.RoomTypeDto;
import com.booking.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/room-type")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    @PostMapping
    public ResponseEntity<String> createRoomType(@RequestBody RoomTypeDto roomTypeDto) {
        roomTypeService.createRoomType(roomTypeDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
