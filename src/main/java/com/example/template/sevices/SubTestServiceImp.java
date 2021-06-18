package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTest;
import com.example.template.repositories.user.SubTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SubTestServiceImp implements SubTestService{
    @Autowired
    SubTestRepository subTestRepository;

    @Override
    public List<SubTest> findAll(GlobalVariables v) {
        return  subTestRepository.findAll(v);
    }

    @Override
    public SubTest saveSubTest(GlobalVariables v,SubTest _subTest) {
        return subTestRepository.saveSubTest(v, _subTest);
    }

    @Override
    public void delete(GlobalVariables v,SubTest _subTest) {
        subTestRepository.deleteSubTest(v, _subTest);
    }

    @Override
    public List<SubTest> findByTestStudentRefAndTestsRef(GlobalVariables v,Long test_student_ref, Long tests_ref) {
        return subTestRepository.findByTestStudentRefAndTestsRef(v, test_student_ref, tests_ref);
    }

    @Override
    public List<SubTest> findByTestStudentRefAndTestsRefAndRef(GlobalVariables v,Long test_student_ref, Long tests_ref, Long ref) {
        return subTestRepository.findByTestStudentRefAndTestsRefAndRef(v, test_student_ref,tests_ref,ref);
    }

    @Override
    public List<SubTest> findByTestStudentRefAndTestsRefAndName(GlobalVariables v,Long test_student_ref, Long tests_ref, String name) {
        return subTestRepository.findByTestStudentRefAndTestsRefAndName(v, test_student_ref, tests_ref, name);
    }

    @Override
    public SubTest findByRef(GlobalVariables v,Long _ref) {
        return subTestRepository.findByRef(v, _ref);
    }

    @Override
    public List<Map<String, String>> findDistinctByName(GlobalVariables v,Long tests_ref) {
        return subTestRepository.findDistinctByName(v, tests_ref);
    }


}
