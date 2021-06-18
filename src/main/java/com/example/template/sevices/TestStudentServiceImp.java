package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.TestStudent;
import com.example.template.repositories.user.TestStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TestStudentServiceImp implements TestStudentService {
    @Autowired
    TestStudentRepository testStudentRepository;
    @Override
    public List<TestStudent> findAll(GlobalVariables v) {
        return  testStudentRepository.findAll(v);
    }

    @Override
    public List<TestStudent> findByTestsRefAndStudentsRef(GlobalVariables v,Long tests_ref, Long students_ref) {
        return testStudentRepository.findByTestsRefAndStudentsRef(v, tests_ref, students_ref);
    }

    @Override
    public TestStudent findByRef(GlobalVariables v,Long _ref) {
        return testStudentRepository.findByRef(v, _ref);
    }

    @Override
    public TestStudent saveTestStudent(GlobalVariables v,TestStudent _testStudent) {
        return testStudentRepository.saveTestStudent(v, _testStudent);
    }

    @Override
    public void deleteTestStudent(GlobalVariables v,TestStudent _testStudent) {
        testStudentRepository.deleteTestStudent(v, _testStudent);
    }

    @Override
    public TestStudent findByTestsRefAndStudentsRefAndRef(GlobalVariables v,Long tests_ref, Long students_ref, Long ref) {
        return testStudentRepository.findByTestsRefAndStudentsRefAndRef(v, tests_ref, students_ref, ref);
    }

    @Override
    public List<TestStudent> findByTestsRef(GlobalVariables v,Long tests_ref) {
        return testStudentRepository.findByTestsRef(v, tests_ref);
    }

    @Override
    public List<TestStudent> findByStudentsRef(GlobalVariables v,Long _studentRef) {
        return testStudentRepository.findByStudentsRef(v, _studentRef);
    }
}
