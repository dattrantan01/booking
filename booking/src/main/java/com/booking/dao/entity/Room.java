package com.booking.dao.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "room")
@Getter
@Setter
public class Room extends BaseEntity {
    @Id
    @GenericGenerator(name = "id_gen", strategy = "com.booking.common.utils.GenerateUUID")
    @GeneratedValue(generator = "id_gen")
    @Column(name = "room_id")
    private String id;

}
