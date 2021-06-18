package com.example.template.model.user;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table//(schema ="user")
public class Advice {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ref;

    private String test_name;
    private String advice_name;
    private String advice_explain;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="tests_ref")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("tests_ref")
    private Tests tests;

    public Advice() {
    }

    public Tests getTests() {
        return tests;
    }

    public void setTests(Tests tests) {
        this.tests = tests;
    }

    public String getAdvice_explain() {
        return advice_explain;
    }

    public void setAdvice_explain(String advice_explain) {
        this.advice_explain = advice_explain;
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

    public String getAdvice_name() {
        return advice_name;
    }

    public void setAdvice_name(String advice_name) {
        this.advice_name = advice_name;
    }

}
