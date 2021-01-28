package com.example.template.repositories;

import com.example.template.model.db.master.Advice;
import com.example.template.model.db.master.SubTest;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdviceRepository extends CrudRepository<Advice, Long> {
    List<Advice> findByTestsRef(Long tests_ref);

}
