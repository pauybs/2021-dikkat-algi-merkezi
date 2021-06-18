package com.example.template.controller;

import com.example.template.model.user.*;
import com.example.template.sevices.StudentsService;
import com.example.template.sevices.TestStudentService;
import com.example.template.sevices.TestsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("teststudent")
public class TestStudentController extends AbstractController{

    private TestStudentService testStudentService;


    private TestsService testsService;

    private StudentsService studentsService;
    @Autowired
    public void setTestStudentService(TestStudentService testStudentService) {
        this.testStudentService = testStudentService;
    }
    @Autowired
    public void setTestsService(TestsService testsService) {
        this.testsService = testsService;
    }
    @Autowired
    public void setStudentsService(StudentsService studentsService) {
        this.studentsService = studentsService;
    }

    @GetMapping(value = "/list/{ssid}")
    public List<TestStudent> listTestJoin(HttpServletRequest request, HttpSession httpSession,
                                          @PathVariable(value = "ssid") String ssid ) throws Exception {
        Iterable<TestStudent> testStudents = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            testStudents= testStudentService.findAll(v);
            return Lists.newArrayList(testStudents);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/tests/{tests_ref}/student/{student_ref}/listByResult/{ssid}")
    public List<TestStudent> listStudent(@PathVariable (value = "tests_ref") Long tests_ref,
                                         @PathVariable (value = "student_ref") Long student_ref,
                                         TestStudent testStudent,
                                         HttpServletRequest request, HttpSession httpSession,
                                         @PathVariable(value = "ssid") String ssid ) throws Exception {
        Iterable<TestStudent> testStudents = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            testStudents= testStudentService.findByTestsRefAndStudentsRef(v,tests_ref, student_ref);
            return Lists.newArrayList(testStudents);
        } else {
            throw new Exception("");
        }

    }
    @PostMapping("/tests/{tests_ref}/student/{student_ref}/add/{ssid}")
    public ResponseEntity<TestStudent> getById(HttpServletRequest request, HttpSession httpSession,
                                               @PathVariable(value = "ssid") String ssid ,
                                               @PathVariable (value = "tests_ref") Long tests_ref,
                                               @PathVariable (value = "student_ref") Long student_ref,
                                               TestStudent testStudent) throws Exception {
        Tests tests = null;
        Students students = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            tests =  testsService.findByRef(v, tests_ref);
            students=studentsService.findByRef(v, student_ref);
            testStudent.setTests(tests);
            testStudent.setStudents(students);
            TestStudent savedTestStudent = testStudentService.saveTestStudent(v, testStudent);
            return ResponseEntity.ok(savedTestStudent);
        }  else {
            throw new Exception("");
        }
    }
    @PutMapping("/tests/{tests_ref}/student/{student_ref}/ts/{ref}/put/{ssid}")
    public ResponseEntity<TestStudent> update(HttpServletRequest request, HttpSession httpSession,
                                              @PathVariable(value = "ssid") String ssid ,
                                              @PathVariable (value = "tests_ref") Long tests_ref,
                                              @PathVariable (value = "student_ref") Long student_ref,
                                              @PathVariable (value="ref") Long ref,
                                              TestStudent testStudent) throws Exception {
        v = checkUser(request, httpSession, ssid);
        Tests tests = null;
        Students students = null;
        if( v != null ) {
            tests =  testsService.findByRef(v, tests_ref);
            students=studentsService.findByRef(v, student_ref);
            testStudent.setTests(tests);
            testStudent.setStudents(students);
            testStudent.setRef(testStudent.getRef());
            testStudentService.saveTestStudent(v, testStudent);
            return ResponseEntity.noContent().build();
        }  else {
            throw new Exception("");
        }
    }
 /*   @RequestMapping(value = "/delete/{ssid}",  method = RequestMethod.DELETE)
    public void deleteStudent(HttpServletRequest request, HttpSession httpSession,
                              @PathVariable(value = "ssid") String ssid , TestStudent testStudent){
        testStudentService.deleteTestStudent(testStudent);
    }*/

    @GetMapping("/tests/{tests_ref}/test_student/{ssid}")
    public List<TestStudent> getAllTest(HttpServletRequest request, HttpSession httpSession,
                                        @PathVariable(value = "ssid") String ssid ,
                                        @PathVariable (value = "tests_ref") Long tests_ref) throws Exception {
        Iterable<TestStudent> testStudents = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            testStudents= testStudentService.findByTestsRef(v,tests_ref);
            return Lists.newArrayList(testStudents);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping("/students/{students_ref}/test_student/{ssid}")
    public List<TestStudent> getAllTestStudentByStudent(HttpServletRequest request, HttpSession httpSession,
                                                        @PathVariable(value = "ssid") String ssid ,
                                                        @PathVariable (value = "students_ref") Long students_ref) throws Exception {
        Iterable<TestStudent> testStudents = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            testStudents= testStudentService.findByStudentsRef(v,students_ref);
            return Lists.newArrayList(testStudents);
        } else {
            throw new Exception("");
        }
    }
    //   Optional.of(optionalTests).filter(testStudentRepository.findByTestsRefAndStudentsRef(tests_ref, student_ref));
    @GetMapping("/tests/{tests_ref}/student/{student_ref}/list/{ref}/{ssid}")
    public ResponseEntity<TestStudent> getAllTestAndStudent(HttpServletRequest request, HttpSession httpSession,
                                                            @PathVariable(value = "ssid") String ssid ,
                                                            @PathVariable (value = "tests_ref") Long tests_ref,
                                                      @PathVariable (value = "student_ref") Long student_ref,
                                                      @PathVariable (value="ref") Long ref,
                                                      TestStudent testStudent) throws Exception {
        TestStudent testStudents = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            testStudents= testStudentService.findByTestsRefAndStudentsRefAndRef(v, tests_ref, student_ref, ref);
            return ResponseEntity.ok(testStudents);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping("/tests/{tests_ref}/student/{student_ref}/filter/{ssid}")
    public List<TestStudent> filterAllTestAndStudent(HttpServletRequest request, HttpSession httpSession,
                                                     @PathVariable(value = "ssid") String ssid ,
                                                     @PathVariable (value = "tests_ref") Long tests_ref,
                                                     @PathVariable (value = "student_ref") Long student_ref) throws Exception {
        Iterable<TestStudent> testStudents = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            testStudents= testStudentService.findByTestsRefAndStudentsRef(v, tests_ref, student_ref);
            return Lists.newArrayList(testStudents);
        } else {
            throw new Exception("");
        }
    }
}
