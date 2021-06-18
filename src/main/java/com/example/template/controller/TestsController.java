package com.example.template.controller;

import com.example.template.model.user.Students;
import com.example.template.model.user.Tests;
import com.example.template.sevices.TestsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/tests")
public class TestsController extends AbstractController{

    private TestsService testsService;
    @Autowired
    public void setTestsService(TestsService testsService) {
        this.testsService = testsService;
    }

    @GetMapping(value = "/list/{ssid}")
    public List<Tests> listTestJoin(HttpServletRequest request, HttpSession httpSession,
                                    @PathVariable(value = "ssid") String ssid ) throws Exception {
        Iterable<Tests> tests = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            tests= testsService.findAll(v);
            return Lists.newArrayList(tests);
        } else {
            throw new Exception("");
        }
    }

}
