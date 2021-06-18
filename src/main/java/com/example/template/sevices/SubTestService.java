package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public interface SubTestService {
    List<SubTest> findAll(GlobalVariables v);
    public SubTest saveSubTest(GlobalVariables v, SubTest _subTest);
    void delete(GlobalVariables v,SubTest _subTest);
    public List<SubTest> findByTestStudentRefAndTestsRef(GlobalVariables v, Long test_student_ref, Long tests_ref);
    public List<SubTest> findByTestStudentRefAndTestsRefAndRef(GlobalVariables v,  Long test_student_ref, Long tests_ref, Long ref);
    public List<SubTest> findByTestStudentRefAndTestsRefAndName(GlobalVariables v, Long test_student_ref, Long tests_ref, String name);
    public SubTest findByRef(GlobalVariables v, Long _ref);
    @Query("SELECT DISTINCT name as name FROM SubTest where tests_ref=:tests_ref")
    List<Map<String, String>> findDistinctByName(GlobalVariables v, @Param("tests_ref") Long tests_ref);
}
