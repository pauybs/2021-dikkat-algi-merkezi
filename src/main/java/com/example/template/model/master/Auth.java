package com.example.template.model.master;

import javax.persistence.*;

@Entity
@Table(schema ="master")
public class Auth {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ref;

    private String code;
    private String title;
    private String password;
    @Transient
    private String passwordConfirm;

    @Transient
    private String securityID;

    public Auth(String code, String title, String password) {
        this.code = code;
        this.title = title;
        this.password = password;
    }

    public Auth(Long ref, String code, String title, String password, String passwordConfirm, String securityID) {
        this.ref = ref;
        this.code = code;
        this.title = title;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
        this.securityID = securityID;
    }

    public Auth() {
    }

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }



    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public String getSecurityID() {
        return securityID;
    }

    public void setSecurityID(String securityID) {
        this.securityID = securityID;
    }
}
