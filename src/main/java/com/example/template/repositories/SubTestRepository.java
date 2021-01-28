package com.example.template.repositories;

import com.example.template.model.db.master.SubTest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SubTestRepository extends CrudRepository<SubTest, Long> {
    @Query("SELECT DISTINCT name as name FROM SubTest where tests_ref=:tests_ref")
    List<Map<String, String>> findDistinctByName(@Param("tests_ref") Long tests_ref);

    List<SubTest> findByTestStudentRefAndTestsRef( Long test_student_ref, Long tests_ref);
    List<SubTest> findByTestStudentRefAndTestsRefAndRef( Long test_student_ref, Long tests_ref, Long ref);
    List<SubTest> findByTestStudentRefAndTestsRefAndName( Long test_student_ref, Long tests_ref, String name);

}
