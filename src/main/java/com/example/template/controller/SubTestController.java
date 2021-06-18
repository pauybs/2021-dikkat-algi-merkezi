package com.example.template.controller;

import com.example.template.model.user.SubTest;
import com.example.template.model.user.TestStudent;
import com.example.template.model.user.Tests;
import com.example.template.sevices.SubTestService;
import com.example.template.sevices.TestStudentService;
import com.example.template.sevices.TestsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/subtest")
public class SubTestController extends AbstractController{

    private SubTestService subTestService;

    private TestsService testsService;

    private TestStudentService testStudentService;
    @Autowired
    public void setSubTestService(SubTestService subTestService) {
        this.subTestService = subTestService;
    }
    @Autowired
    public void setTestsService(TestsService testsService) {
        this.testsService = testsService;
    }
    @Autowired
    public void setTestStudentService(TestStudentService testStudentService) {
        this.testStudentService = testStudentService;
    }

    @GetMapping(value = "/list/{ssid}")
    public ArrayList<SubTest> listTestJoin(HttpServletRequest request, HttpSession httpSession,
                                           @PathVariable(value = "ssid") String ssid ) throws Exception {

        Iterable<SubTest> subTests = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTests= subTestService.findAll(v);
            return Lists.newArrayList(subTests);
        } else {
            throw new Exception("");
        }
    }
    @PostMapping("/teststudent/{test_student_ref}/tests/{tests_ref}/add/{ssid}")
    public ResponseEntity<SubTest> getById(HttpServletRequest request, HttpSession httpSession,
                                           @PathVariable(value = "ssid") String ssid ,
                                           @PathVariable (value = "test_student_ref") Long test_student_ref,
                                           @PathVariable (value = "tests_ref") Long tests_ref,
                                           SubTest subTest) throws Exception {
        Tests tests=null;
        TestStudent testStudent=null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            tests =  testsService.findByRef(v, tests_ref);
            testStudent=testStudentService.findByRef(v,test_student_ref);
            subTest.setTests(tests);
            subTest.setTestStudent(testStudent);
            SubTest savedSubTest = subTestService.saveSubTest(v, subTest);
            return ResponseEntity.ok(subTest);
        }  else {
            throw new Exception("");
        }

    }
    @PutMapping("/teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/put/{ssid}")
    public ResponseEntity<SubTest> update(HttpServletRequest request, HttpSession httpSession,
                                          @PathVariable(value = "ssid") String ssid ,
                                          @PathVariable (value = "test_student_ref") Long test_student_ref,
                                          @PathVariable (value = "tests_ref") Long tests_ref,
                                          SubTest subTest) throws Exception {
        v = checkUser(request, httpSession, ssid);
        Tests tests=null;
        TestStudent testStudent=null;
        if( v != null ) {
            tests =  testsService.findByRef(v, tests_ref);
            testStudent=testStudentService.findByRef(v,test_student_ref);
            subTest.setTests(tests);
            subTest.setTestStudent(testStudent);
            subTest.setRef(subTest.getRef());
            subTestService.saveSubTest(v, subTest);
            return ResponseEntity.noContent().build();
        }  else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/listByTestRef/{test_ref}/{ssid}")
    public List<Map<String, String>> listTestRef(HttpServletRequest request, HttpSession httpSession,
                                                 @PathVariable(value = "ssid") String ssid ,
                                                 @PathVariable(value = "test_ref") Long test_ref) throws Exception {
        List<Map<String, String>> sts = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            sts = subTestService.findDistinctByName(v, test_ref);
            return Lists.newArrayList(sts);
        } else {
            throw new Exception("");
        }

    }
    @GetMapping(value = "/teststudent/{test_student_ref}/tests/{tests_ref}/{ssid}")
    public List<SubTest> filterAllTestAndStudent(HttpServletRequest request, HttpSession httpSession,
                                                 @PathVariable(value = "ssid") String ssid ,
                                                 @PathVariable (value = "test_student_ref") Long test_student_ref,
                                                 @PathVariable (value = "tests_ref") Long tests_ref,
                                                 SubTest subTest) throws Exception {
        Iterable<SubTest> subTests = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTests=subTestService.findByTestStudentRefAndTestsRef(v, test_student_ref, tests_ref);
            return Lists.newArrayList(subTests);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/ref/{ssid}")
    public List<SubTest> filterAllTestAndRef(HttpServletRequest request, HttpSession httpSession,
                                             @PathVariable(value = "ssid") String ssid ,
                                             @PathVariable (value = "test_student_ref") Long test_student_ref,
                                                 @PathVariable (value = "tests_ref") Long tests_ref,
                                             @PathVariable (value="ref") Long ref,
                                                 SubTest subTest) throws Exception {
        Iterable<SubTest> subTests = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTests=subTestService.findByTestStudentRefAndTestsRefAndRef(v,test_student_ref, tests_ref, ref);
            return Lists.newArrayList(subTests);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/teststudent/{test_student_ref}/tests/{tests_ref}/dikkat/{ssid}")
    public List<SubTest> filterAllTestAndDikkat(HttpServletRequest request, HttpSession httpSession,
                                                @PathVariable(value = "ssid") String ssid,
                                                @PathVariable (value = "test_student_ref") Long test_student_ref,
                                             @PathVariable (value = "tests_ref") Long tests_ref,
                                             @PathVariable (value="ref") Long ref,
                                             SubTest subTest) throws Exception {
        Iterable<SubTest> subTests = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            subTests=subTestService.findByTestStudentRefAndTestsRefAndName(v, test_student_ref, tests_ref, "Dikkat");
            return Lists.newArrayList(subTests);
        } else {
            throw new Exception("");
        }
    }
}
