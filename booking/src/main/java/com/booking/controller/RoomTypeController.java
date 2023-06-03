package com.booking.controller;

import com.booking.dto.RoomTypeDto;
import com.booking.service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/room-types")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    @PostMapping
    public ResponseEntity<String> createRoomType(@RequestBody RoomTypeDto roomTypeDto) {
        roomTypeService.createRoomType(roomTypeDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping
    public ResponseEntity<List<RoomTypeDto>> getAllRoomTypes() {
        List<RoomTypeDto> roomTypeDtos = roomTypeService.getAllRoomType();
        return new ResponseEntity<>(roomTypeDtos, HttpStatus.OK);
    }

}
