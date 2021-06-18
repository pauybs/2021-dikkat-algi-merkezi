package com.example.template.model.master;

import javax.persistence.*;

@Entity
@Table//(schema ="master")
public class Admin {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ref;

    private String title;
    private String password;

    public Admin() {
    }

    public Admin(String title, String password) {
        this.title = title;
        this.password = password;
    }

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
