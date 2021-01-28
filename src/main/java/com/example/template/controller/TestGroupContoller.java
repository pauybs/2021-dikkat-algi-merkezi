package com.example.template.controller;

import com.example.template.model.db.master.Students;
import com.example.template.model.db.master.TestGroup;
import com.example.template.repositories.TestGroupRepository;
import com.example.template.repositories.TestStudentRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/testgroup")
public class TestGroupContoller {
    @Autowired
    TestGroupRepository testGroupRepository;
    @GetMapping(value = "/list")
    public List<TestGroup> listTestJoin(HttpSession httpSession){
        Iterable<TestGroup> sts = testGroupRepository.findAll();
        return Lists.newArrayList(sts);
    }
}
