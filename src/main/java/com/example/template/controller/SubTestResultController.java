package com.example.template.controller;

import com.example.template.model.user.SubTest;
import com.example.template.model.user.SubTestResult;
import com.example.template.model.user.TestStudent;
import com.example.template.model.user.Tests;
import com.example.template.sevices.SubTestResultService;
import com.example.template.sevices.SubTestService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/subtestresult")
public class SubTestResultController extends AbstractController{

    private SubTestResultService subTestResultService;

    private SubTestService subTestService;
    @Autowired
    public void setSubTestResultService(SubTestResultService subTestResultService) {
        this.subTestResultService = subTestResultService;
    }
    @Autowired
    public void setSubTestService(SubTestService subTestService) {
        this.subTestService = subTestService;
    }

    @GetMapping(value = "/list/{ssid}")
    public List<SubTestResult> listTestJoin(HttpServletRequest request, HttpSession httpSession,
                                            @PathVariable(value = "ssid") String ssid ) throws Exception {
        Iterable<SubTestResult> subTestResults = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTestResults= subTestResultService.findAll(v);
            return Lists.newArrayList(subTestResults);
        } else {
            throw new Exception("");
        }
    }

    @PostMapping("/subtest/{sub_test}/{ssid}")
    public ResponseEntity<SubTestResult> getById(HttpServletRequest request, HttpSession httpSession,
                                                 @PathVariable(value = "ssid") String ssid ,
                                                 @PathVariable (value = "sub_test") Long sub_test,
                                                 SubTestResult subTestResult) throws Exception {
        SubTest subTest=null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTest =  subTestService.findByRef(v, sub_test);
            subTestResult.setSubTest(subTest);
            SubTestResult savedSubTestResult = subTestResultService.saveSubTestResult(v, subTestResult);
            return ResponseEntity.ok(savedSubTestResult);
        }  else {
            throw new Exception("");
        }

    }
    @PutMapping("/subtest/{sub_test}/ref/{ref}/put/{ssid}")
    public ResponseEntity<SubTestResult> update(HttpServletRequest request, HttpSession httpSession,
                                                @PathVariable(value = "ssid") String ssid ,
                                                @PathVariable (value = "sub_test") Long sub_test,
                                              @PathVariable (value="ref") Long ref,
                                              SubTestResult subTestResult) throws Exception {
        v = checkUser(request, httpSession, ssid);
        SubTest subTest=null;
        if( v != null ) {
            subTest =  subTestService.findByRef(v, sub_test);
            subTestResult.setSubTest(subTest);
            subTestResult.setRef(subTestResult.getRef());
            subTestResultService.saveSubTestResult(v, subTestResult);
            return ResponseEntity.noContent().build();
        }  else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/subtest/{sub_test_ref}/list/{ssid}")
    public List<SubTestResult> filterAllTestAndStudent(HttpServletRequest request, HttpSession httpSession,
                                                       @PathVariable(value = "ssid") String ssid ,
                                                       @PathVariable (value = "sub_test_ref") Long sub_test_ref,
                                                 SubTestResult subTestResult) throws Exception {
        Iterable<SubTestResult> subTestResults = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTestResults= subTestResultService.findBySubTestRef(v, sub_test_ref);
            return Lists.newArrayList(subTestResults);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/subtest/{sub_test_ref}/ref/{ref}/list/{ssid}")
    public List<SubTestResult> filterAllTestAndStudentAndRef(HttpServletRequest request, HttpSession httpSession,
                                                             @PathVariable(value = "ssid") String ssid ,
                                                             @PathVariable (value = "sub_test_ref") Long sub_test_ref,
                                                             @PathVariable (value="ref") Long ref,
                                                       SubTestResult subTestResult) throws Exception {
        Iterable<SubTestResult> subTestResults = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTestResults= subTestResultService.findBySubTestRefAndRef(v, sub_test_ref, ref);
            return Lists.newArrayList(subTestResults);
        } else {
            throw new Exception("");
        }
    }
}
