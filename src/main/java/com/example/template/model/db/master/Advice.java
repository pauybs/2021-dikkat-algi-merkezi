package com.example.template.model.db.master;


import com.fasterxml.jackson.annotation.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
@Table(name="advice")
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
    @Fetch(FetchMode.JOIN)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("tests_ref")
    private Tests tests;

    public Advice() {
    }

    public Advice(Long ref, String advice_name, Tests tests) {
        this.ref = ref;
        this.advice_name = advice_name;
        this.tests = tests;
    }

    public Advice(Long ref, String test_name, String advice_name, String advice_explain, Tests tests) {
        this.ref = ref;
        this.test_name = test_name;
        this.advice_name = advice_name;
        this.advice_explain = advice_explain;
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

    public Tests getTests() {
        return tests;
    }
    @JsonProperty("tests_ref")
    public void setTests(Tests tests) {
        this.tests = tests;
    }
}
