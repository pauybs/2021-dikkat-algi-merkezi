package com.example.template.model.db.master;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="test_group")
public class TestGroup implements Serializable {
    @Column
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private long ref;

    private String group_name;

 /*   @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "testsgroup")
    private Set<Tests> tests = new HashSet<>();*/

    public TestGroup(long ref, String group_name, Set<Tests> comments) {
        this.ref = ref;
        this.group_name = group_name;
    }

    public TestGroup() {
    }

    public long getRef() {
        return ref;
    }

    public void setRef(long ref) {
        this.ref = ref;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

 /*   public Set<Tests> getTests() {
        return tests;
    }

    public void setTests(Set<Tests> tests) {
        this.tests = tests;
    }*/
}
