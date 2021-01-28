package com.example.template.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter @Setter
public abstract class TitleObject extends RefObject {

    @Column
    private String title;
}
