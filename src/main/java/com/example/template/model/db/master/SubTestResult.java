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
@Table(name="sub_test_result")
public class SubTestResult {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long ref;
    private String result;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="sub_test_ref")
    @Fetch(FetchMode.JOIN)
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "ref")
    @JsonIdentityReference(alwaysAsId = true)
    @JsonProperty("sub_test_ref")
    private SubTest subTest;

    public SubTestResult() {
    }

    public SubTestResult(Long ref, String result, String name, SubTest subTest) {
        this.ref = ref;
        this.result = result;
        this.name = name;
        this.subTest = subTest;
    }

    public Long getRef() {
        return ref;
    }

    public void setRef(Long ref) {
        this.ref = ref;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public SubTest getSubTest() {
        return subTest;
    }
    @JsonProperty("sub_test_ref")
    public void setSubTest(SubTest subTest) {
        this.subTest = subTest;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
