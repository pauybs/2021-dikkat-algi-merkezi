package com.example.template.model.db;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@MappedSuperclass
@Getter @Setter
public class RefObject {

    public RefObject(){

    }

    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int ref;
}
