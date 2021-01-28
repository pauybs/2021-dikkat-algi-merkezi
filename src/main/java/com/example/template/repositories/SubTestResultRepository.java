package com.example.template.repositories;


import com.example.template.model.db.master.SubTestResult;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTestResultRepository extends CrudRepository<SubTestResult, Long> {
    List<SubTestResult> findBySubTestRef(Long sub_test_ref);
    List<SubTestResult> findBySubTestRefAndRef(Long sub_test_ref, Long ref);

}
