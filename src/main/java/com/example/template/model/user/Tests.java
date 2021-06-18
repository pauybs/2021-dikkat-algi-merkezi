package com.example.template.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tests")
public class Tests  {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ref;

    private String test_name;

    @OneToMany(mappedBy = "tests", cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    private Set<TestStudent> testStudents = new HashSet<>();

    @OneToMany(mappedBy = "tests", cascade = CascadeType.ALL)
    @Fetch(FetchMode.JOIN)
    private Set<Advice> advice = new HashSet<>();

    public Tests() {
    }


    public Tests(Long ref, String test_name, Set<TestStudent> testStudents) {
        this.ref = ref;
        this.test_name = test_name;
        this.testStudents = testStudents;
    }

    public Tests(Long ref, String test_name, Set<TestStudent> testStudents,  Set<Advice> advice) {
        this.ref = ref;
        this.test_name = test_name;
        this.testStudents = testStudents;
        this.advice = advice;
    }

    public Set<Advice> getAdvice() {
        return advice;
    }

    public void setAdvice(Set<Advice> advice) {
        this.advice = advice;
    }

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }

    public String getTest_name() {
        return test_name;
    }

    public void setTest_name(String test_name) {
        this.test_name = test_name;
    }


    public Set<TestStudent> getTestStudents() {
        return testStudents;
    }

    public void setTestStudents(Set<TestStudent> testStudents) {
        this.testStudents = testStudents;
    }

}
