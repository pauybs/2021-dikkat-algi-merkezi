package com.example.template.model.db.master;

import com.example.template.model.db.RefObject;
import com.fasterxml.jackson.annotation.*;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.persistence.FetchType;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="test_student")
public class TestStudent implements Serializable {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ref;

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="tests_ref")
    @Fetch(FetchMode.JOIN)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("tests_ref")
    private Tests tests;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="students_ref")
    @Fetch(FetchMode.JOIN)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("students_ref")
    private Students students;

    @OneToMany(mappedBy = "testStudent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SubTest> subTests = new HashSet<>();

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonProperty("start")
    private Date test_date;


    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonProperty("end")
    private Date end_date;
    private String title;
    private String status;



    public TestStudent() {
    }

    public TestStudent(Long ref, Tests tests, Students students, Date test_date, Date end_date, String title) {
        this.ref = ref;
        this.tests = tests;
        this.students = students;
        this.test_date = test_date;
        this.end_date = end_date;
        this.title = title;
    }

    public TestStudent(Long ref, Tests tests, Students students, Set<SubTest> subTests, Date test_date, Date end_date, String title, String status) {
        this.ref = ref;
        this.tests = tests;
        this.students = students;
        this.subTests = subTests;
        this.test_date = test_date;
        this.end_date = end_date;
        this.title = title;
        this.status = status;
    }

    public Tests getTests() {
        return tests;
    }
    @JsonProperty("tests_ref")
    public void setTests(Tests tests) {
        this.tests = tests;
    }

    public Students getStudents() {
        return students;
    }
    @JsonProperty("students_ref")
    public void setStudents(Students students) {
        this.students = students;
    }

    public Date getTest_date() {
        return test_date;
    }

    public void setTest_date(Date test_date) {
        this.test_date = test_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public Set<SubTest> getSubTests() {
        return subTests;
    }

    public void setSubTests(Set<SubTest> subTests) {
        this.subTests = subTests;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
