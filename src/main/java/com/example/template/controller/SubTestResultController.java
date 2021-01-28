package com.example.template.controller;

import com.example.template.model.db.master.*;
import com.example.template.repositories.StudentsRepository;
import com.example.template.repositories.SubTestRepository;
import com.example.template.repositories.SubTestResultRepository;
import com.example.template.repositories.TestStudentRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/subtestresult")
public class SubTestResultController {
    @Autowired
    SubTestResultRepository subTestResultRepository;
    @Autowired
    SubTestRepository subTestRepository;

    @GetMapping(value = "/list")
    public List<SubTestResult> listTestJoin(HttpSession httpSession){
        Iterable<SubTestResult> sts = subTestResultRepository.findAll();
        return Lists.newArrayList(sts);
    }

    @PostMapping("/subtest/{sub_test}")
    public ResponseEntity<SubTestResult> getById(@PathVariable (value = "sub_test") Long sub_test,
                                               SubTestResult subTestResult) {
        Optional<SubTest> optionalSubTest = subTestRepository.findById(sub_test);
        if (!optionalSubTest.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        subTestResult.setSubTest(optionalSubTest.get());
        SubTestResult savedSubTestResult = subTestResultRepository.save(subTestResult);
        return  ResponseEntity.ok(savedSubTestResult);
    }
    @PutMapping("/subtest/{sub_test}/ref/{ref}/put")
    public ResponseEntity<SubTestResult> update(@PathVariable (value = "sub_test") Long sub_test,
                                              @PathVariable (value="ref") Long ref,
                                              SubTestResult subTestResult) {
        Optional<SubTest> optionalSubTest = subTestRepository.findById(sub_test);
        if (!optionalSubTest.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        Optional<SubTestResult> optionalSubTestResult= subTestResultRepository.findById(ref);
        if (!optionalSubTestResult.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        subTestResult.setSubTest(optionalSubTest.get());
        subTestResult.setRef(optionalSubTestResult.get().getRef());
        subTestResultRepository.save(subTestResult);
        return ResponseEntity.noContent().build();
    }
    @GetMapping(value = "/subtest/{sub_test_ref}/list")
    public List<SubTestResult> filterAllTestAndStudent(@PathVariable (value = "sub_test_ref") Long sub_test_ref,
                                                 SubTestResult subTestResult){
        return subTestResultRepository.findBySubTestRef(sub_test_ref);
    }
    @GetMapping(value = "/subtest/{sub_test_ref}/ref/{ref}/list")
    public List<SubTestResult> filterAllTestAndStudentAndRef(@PathVariable (value = "sub_test_ref") Long sub_test_ref,
                                                             @PathVariable (value="ref") Long ref,
                                                       SubTestResult subTestResult){
        return subTestResultRepository.findBySubTestRefAndRef(sub_test_ref, ref);
    }
}
