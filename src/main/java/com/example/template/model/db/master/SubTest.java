package com.example.template.model.db.master;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="sub_test")
public class SubTest {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ref;
    private String name;
    private String status;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="test_student_ref")
    @Fetch(FetchMode.JOIN)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("test_student_ref")
    private TestStudent testStudent;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="tests_ref")
    @Fetch(FetchMode.JOIN)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("tests_ref")
    private Tests tests;

    @OneToMany(mappedBy = "subTest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SubTestResult> subTestResults = new HashSet<>();

    public SubTest() {
    }

    public SubTest(Long ref, String name, Tests tests, Students students, TestStudent testStudent) {
        this.ref = ref;
        this.name = name;
        this.testStudent = testStudent;
    }



    public SubTest(Long ref, String name, String status, Tests tests, Students students, TestStudent testStudent) {
        this.ref = ref;
        this.name = name;
        this.status = status;
        this.testStudent = testStudent;
    }

    public SubTest(Long ref, String name, String status, TestStudent testStudent, Tests tests, Set<SubTestResult> subTestResults) {
        this.ref = ref;
        this.name = name;
        this.status = status;
        this.testStudent = testStudent;
        this.tests = tests;
        this.subTestResults = subTestResults;
    }

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public TestStudent getTestStudent() {
        return testStudent;
    }
    @JsonProperty("test_student_ref")
    public void setTestStudent(TestStudent testStudent) {
        this.testStudent = testStudent;
    }

    public Set<SubTestResult> getSubTestResults() {
        return subTestResults;
    }

    public void setSubTestResults(Set<SubTestResult> subTestResults) {
        this.subTestResults = subTestResults;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Tests getTests() {
        return tests;
    }
    @JsonProperty("tests_ref")
    public void setTests(Tests tests) {
        this.tests = tests;
    }
}
