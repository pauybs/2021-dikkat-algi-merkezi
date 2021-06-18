package com.example.template.controller;


import com.example.template.GlobalVariables;
import com.example.template.model.user.Advice;
import com.example.template.model.user.Students;
import com.example.template.sevices.StudentsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentsController extends AbstractController {

    private StudentsService studentsService;

    @Autowired
    public void setStudentsService(StudentsService studentsService) {
        this.studentsService = studentsService;
    }

    @GetMapping(value = "/list/{ssid}")
    public List<Students> listStudent(HttpServletRequest request, HttpSession httpSession,
                                      @PathVariable(value = "ssid") String ssid ) throws Exception {

        Iterable<Students> students = null;
         v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            students= studentsService.findAll(v);
            return Lists.newArrayList(students);
        } else {
            throw new Exception("");
        }
    }
    @PutMapping("/update/{ssid}")
    public ResponseEntity<Students> updatePost(HttpServletRequest request, HttpSession httpSession,
                                               @PathVariable(value = "ssid") String ssid,
                                               Students student) throws Exception {
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            student.setRef(student.getRef());
            studentsService.saveStudent(v, student);
            return ResponseEntity.noContent().build();
        }  else {
            throw new Exception("");
        }
    }
    @PostMapping(value = "/add/{ssid}")
    public Students addStudent(HttpServletRequest request, HttpSession httpSession,
                               @PathVariable(value = "ssid") String ssid, Students student) throws Exception {
         v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            Students savedStudents = studentsService.saveStudent(v, student);
            return savedStudents;
        }  else {
            throw new Exception("");
        }
    }
    @DeleteMapping(value = "/delete/{ssid}")
    public Students deleteStudent(HttpServletRequest request, HttpSession httpSession,
                              @PathVariable(value = "ssid") String ssid, Students students) throws Exception {
        Students sts =  null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {

            sts=studentsService.deleteStudent(v, students);
            return sts;
        }  else {
            throw new Exception("");
        }
    }
}
