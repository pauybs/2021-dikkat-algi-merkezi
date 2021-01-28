package com.example.template.controller;

import com.example.template.model.db.master.TestStudent;
import com.example.template.model.db.master.Tests;
import com.example.template.repositories.TestsRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tests")
public class TestsController {
    @Autowired
    TestsRepository testRepository;

    @GetMapping(value = "/list")
    public List<Tests> listTestJoin(HttpSession httpSession){
        Iterable<Tests> sts = testRepository.findAll();
        return Lists.newArrayList(sts);
    }
    @GetMapping(value = "/listById")
    public List<Tests> listStudent(HttpSession httpSession){
        Iterable<Tests> sts = testRepository.findByRef(1);

        return Lists.newArrayList(sts);
    }

}
