package com.example.template.controller;

import com.example.template.model.db.master.*;
import com.example.template.repositories.AdviceRepository;
import com.example.template.repositories.TestsRepository;
import com.google.common.collect.Lists;
import org.hibernate.query.criteria.internal.expression.function.AbsFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/advice")
public class AdviceController {
    @Autowired
    AdviceRepository adviceRepository;
    @Autowired
    TestsRepository testsRepository;

    @GetMapping(value = "/list")
    public List<Advice> listTestJoin(HttpSession httpSession){
        Iterable<Advice> sts = adviceRepository.findAll();
        return Lists.newArrayList(sts);
    }
    @GetMapping(value = "/tests/{tests_ref}")
    public List<Advice> filterAllTest(@PathVariable (value = "tests_ref") Long tests_ref,
                                                 Advice advice){
        return adviceRepository.findByTestsRef(tests_ref);
    }
    @PostMapping("/tests/{tests_ref}/add")
    public ResponseEntity<Advice> getById(@PathVariable (value = "tests_ref") Long tests_ref, Advice advice) {
        Optional<Tests> optionalTests = testsRepository.findById(tests_ref);
        if (!optionalTests.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        advice.setTests(optionalTests.get());

        Advice savedAdvice = adviceRepository.save(advice);


        return  ResponseEntity.ok(savedAdvice);
    }
    @PutMapping("/tests/{tests_ref}/ad/{ref}/put")
    public ResponseEntity<TestStudent> update(@PathVariable (value = "tests_ref") Long tests_ref,
                                              @PathVariable (value="ref") Long ref,
                                              Advice advice) {
        Optional<Tests> optionalTests = testsRepository.findById(tests_ref);
        if (!optionalTests.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        Optional<Advice> optionalAdvice= adviceRepository.findById(ref);
        if (!optionalAdvice.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }

        advice.setTests(optionalTests.get());
        advice.setRef(optionalAdvice.get().getRef());
        adviceRepository.save(advice);

        return ResponseEntity.noContent().build();
    }
    @RequestMapping(value = "/delete",  method = RequestMethod.DELETE)
    public void delete(HttpSession httpSession, Advice advice){
        adviceRepository.delete(advice);
    }
}
