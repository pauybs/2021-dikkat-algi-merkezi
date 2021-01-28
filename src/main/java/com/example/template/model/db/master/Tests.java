package com.example.template.model.db.master;

import com.example.template.model.db.RefObject;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tests")
public class Tests  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ref;

    private String test_name;

    @OneToMany(mappedBy = "tests", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TestStudent> testStudents = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JsonIgnore
    @JoinColumn(name="test_group")
    @Fetch(FetchMode.JOIN)
    private TestGroup testGroup;

    @OneToMany(mappedBy = "tests", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Advice> advice = new HashSet<>();

    public Tests() {
    }

    public Tests(Long ref, String test_name, Set<Students> students) {
        this.ref = ref;
        this.test_name = test_name;
    }

    public Tests(Long ref, String test_name, Set<TestStudent> testStudents, TestGroup testGroup) {
        this.ref = ref;
        this.test_name = test_name;
        this.testStudents = testStudents;
        this.testGroup = testGroup;
    }

    public Tests(Long ref, String test_name, Set<TestStudent> testStudents, TestGroup testGroup, Set<Advice> advice) {
        this.ref = ref;
        this.test_name = test_name;
        this.testStudents = testStudents;
        this.testGroup = testGroup;
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

    public TestGroup getTestGroup() {
        return testGroup;
    }

    public void setTestGroup(TestGroup testGroup) {
        this.testGroup = testGroup;
    }

    public Set<TestStudent> getTestStudents() {
        return testStudents;
    }

    public void setTestStudents(Set<TestStudent> testStudents) {
        this.testStudents = testStudents;
    }

}
