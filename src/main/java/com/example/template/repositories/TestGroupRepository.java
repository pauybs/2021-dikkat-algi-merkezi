package com.example.template.repositories;

import com.example.template.model.db.master.TestGroup;
import com.example.template.model.db.master.Tests;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestGroupRepository extends CrudRepository<TestGroup, Long> {
}
