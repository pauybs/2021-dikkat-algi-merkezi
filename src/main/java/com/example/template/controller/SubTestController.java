package com.example.template.controller;

import com.example.template.model.db.master.*;
import com.example.template.repositories.*;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/subtest")
public class SubTestController {
    @Autowired
    SubTestRepository subTestRepository;
    @Autowired
    TestsRepository testsRepository;
    @Autowired
    TestStudentRepository testStudentRepository;

    @GetMapping(value = "/list")
    public List<SubTest> listTestJoin(HttpSession httpSession){
        Iterable<SubTest> sts = subTestRepository.findAll();
        return Lists.newArrayList(sts);
    }
    @PostMapping("/teststudent/{test_student_ref}/tests/{tests_ref}/add")
    public ResponseEntity<SubTest> getById(@PathVariable (value = "test_student_ref") Long test_student_ref,
                                           @PathVariable (value = "tests_ref") Long tests_ref,
                                                 SubTest subTest) {
        Optional<TestStudent> optionalTestStudent = testStudentRepository.findById(test_student_ref);
        if (!optionalTestStudent.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Optional<Tests> optionalTests = testsRepository.findById(tests_ref);
        if (!optionalTests.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        subTest.setTestStudent(optionalTestStudent.get());
        subTest.setTests(optionalTests.get());
        SubTest savedSubTest = subTestRepository.save(subTest);

        return  ResponseEntity.ok(savedSubTest);
    }
    @PutMapping("/teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/put")
    public ResponseEntity<SubTest> update(@PathVariable (value = "test_student_ref") Long test_student_ref,
                                          @PathVariable (value = "tests_ref") Long tests_ref,
                                          @PathVariable (value="ref") Long ref,
                                          SubTest subTest) {

        Optional<TestStudent> optionalTestStudent= testStudentRepository.findById(test_student_ref);
        if (!optionalTestStudent.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        Optional<Tests> optionalTests = testsRepository.findById(tests_ref);
        if (!optionalTests.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        Optional<SubTest> optionalSubTest= subTestRepository.findById(ref);
        if (!optionalSubTest.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        subTest.setTestStudent(optionalTestStudent.get());
        subTest.setTests(optionalTests.get());
        subTest.setRef(optionalSubTest.get().getRef());
        subTestRepository.save(subTest);
        return ResponseEntity.noContent().build();
    }
    @GetMapping(value = "/listByTestRef/{test_ref}")
    public List<Map<String, String>> listTestRef(@PathVariable(value = "test_ref") Long test_ref, HttpSession httpSession){
        List<Map<String, String>> sts = subTestRepository.findDistinctByName(test_ref);
        return sts;
    }
    @GetMapping(value = "/teststudent/{test_student_ref}/tests/{tests_ref}")
    public List<SubTest> filterAllTestAndStudent(@PathVariable (value = "test_student_ref") Long test_student_ref,
                                                 @PathVariable (value = "tests_ref") Long tests_ref,
                                                 SubTest subTest){
        return subTestRepository.findByTestStudentRefAndTestsRef(test_student_ref, tests_ref);
    }
    @GetMapping(value = "/teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/ref")
    public List<SubTest> filterAllTestAndRef(@PathVariable (value = "test_student_ref") Long test_student_ref,
                                                 @PathVariable (value = "tests_ref") Long tests_ref,
                                             @PathVariable (value="ref") Long ref,
                                                 SubTest subTest){
        return subTestRepository.findByTestStudentRefAndTestsRefAndRef(test_student_ref, tests_ref, ref);
    }
    @GetMapping(value = "/teststudent/{test_student_ref}/tests/{tests_ref}/dikkat")
    public List<SubTest> filterAllTestAndDikkat(@PathVariable (value = "test_student_ref") Long test_student_ref,
                                             @PathVariable (value = "tests_ref") Long tests_ref,
                                             @PathVariable (value="ref") Long ref,
                                             SubTest subTest){
        return subTestRepository.findByTestStudentRefAndTestsRefAndName(test_student_ref, tests_ref, "Dikkat");
    }
}
