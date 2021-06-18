package com.example.template.repositories.user;


import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SubTestRepository {
    @Query("SELECT DISTINCT name as name FROM SubTest where tests_ref=:tests_ref")
    List<Map<String, String>> findDistinctByName(GlobalVariables v, @Param("tests_ref") Long tests_ref);

    List<SubTest> findByTestStudentRefAndTestsRef(GlobalVariables v, Long test_student_ref, Long tests_ref);
    List<SubTest> findByTestStudentRefAndTestsRefAndRef(GlobalVariables v,  Long test_student_ref, Long tests_ref, Long ref);
    List<SubTest> findByTestStudentRefAndTestsRefAndName(GlobalVariables v,  Long test_student_ref, Long tests_ref, String name);

    SubTest findByRef(GlobalVariables v, Long _ref);

    List<SubTest> findAll(GlobalVariables v);
    SubTest saveSubTest(GlobalVariables v, SubTest subTest);
    SubTest deleteSubTest(GlobalVariables v, SubTest subTest);

}
