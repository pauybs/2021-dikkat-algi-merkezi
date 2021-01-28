package com.example.template.model.db.master;

import com.example.template.model.db.RefObject;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="students")
public class Students implements Serializable {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long ref;

    private String std_name;
    private String std_surname;
    private String birthday;
    private String birthplace;

    private String adress1;
    private String saint;
    private String phone1;
    private String phone2;
    private String mail;

    private String school;
    private String grade;
    private String status;
    private String register_date;
    private String note;

    private String program;
    private String profileType;

    @OneToMany(mappedBy = "students", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TestStudent> testStudents = new HashSet<>();

    public Students() {
    }

    public Students(long ref, String std_name, String std_surname, String birthday, String birthplace, String adress1, String saint, String phone1, String phone2, String mail, String school, String grade, String status, String register_date, String note, String program, String profileType, Set<TestStudent> testStudents) {
        this.ref = ref;
        this.std_name = std_name;
        this.std_surname = std_surname;
        this.birthday = birthday;
        this.birthplace = birthplace;
        this.adress1 = adress1;
        this.saint = saint;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.mail = mail;
        this.school = school;
        this.grade = grade;
        this.status = status;
        this.register_date = register_date;
        this.note = note;
        this.program = program;
        this.profileType = profileType;
        this.testStudents = testStudents;
    }

    public long getRef() {
        return ref;
    }

    public void setRef(long ref) {
        this.ref = ref;
    }

    public String getStd_name() {
        return std_name;
    }

    public void setStd_name(String std_name) {
        this.std_name = std_name;
    }

    public String getStd_surname() {
        return std_surname;
    }

    public void setStd_surname(String std_surname) {
        this.std_surname = std_surname;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getBirthplace() {
        return birthplace;
    }

    public void setBirthplace(String birthplace) {
        this.birthplace = birthplace;
    }

    public String getAdress1() {
        return adress1;
    }

    public void setAdress1(String adress1) {
        this.adress1 = adress1;
    }

    public String getSaint() {
        return saint;
    }

    public void setSaint(String saint) {
        this.saint = saint;
    }

    public String getPhone1() {
        return phone1;
    }

    public void setPhone1(String phone1) {
        this.phone1 = phone1;
    }

    public String getPhone2() {
        return phone2;
    }

    public void setPhone2(String phone2) {
        this.phone2 = phone2;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getProfileType() {
        return profileType;
    }

    public void setProfileType(String profileType) {
        this.profileType = profileType;
    }

    public Set<TestStudent> getTestStudents() {
        return testStudents;
    }

    public void setTestStudents(Set<TestStudent> testStudents) {
        this.testStudents = testStudents;
    }

    public String getRegister_date() {
        return register_date;
    }

    public void setRegister_date(String register_date) {
        this.register_date = register_date;
    }
}
