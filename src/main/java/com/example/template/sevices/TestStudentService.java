package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.TestStudent;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface TestStudentService {
    List<TestStudent> findAll(GlobalVariables v);
    List<TestStudent> findByTestsRefAndStudentsRef(GlobalVariables v,Long tests_ref, Long students_ref);
    public TestStudent findByRef(GlobalVariables v,Long _ref);
    public TestStudent saveTestStudent(GlobalVariables v,TestStudent _testStudent);
    void deleteTestStudent(GlobalVariables v,TestStudent _testStudent);
    public TestStudent findByTestsRefAndStudentsRefAndRef(GlobalVariables v,Long tests_ref,Long students_ref, Long ref);
    public List<TestStudent> findByTestsRef(GlobalVariables v,Long tests_ref);
    public List<TestStudent> findByStudentsRef(GlobalVariables v,Long _studentRef);
}
