package com.example.template.model.db;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter @Setter
public class CodeTitleObject extends TitleObject{

    @Column
    private String code;
}
