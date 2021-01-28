package com.example.template.controller;

import com.example.template.exception.ResourceNotFoundException;
import com.example.template.model.db.master.Students;
import com.example.template.repositories.StudentsRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentsController {
    @Autowired
    StudentsRepository studentsRepository;

    @GetMapping(value = "/list")
    public List<Students> listTestJoin(HttpSession httpSession){
        Iterable<Students> sts = studentsRepository.findAll();
        return Lists.newArrayList(sts);
    }

    public List<Students> listStudent(HttpSession httpSession){
        Iterable<Students> sts = studentsRepository.findAll();
     //   studentRepository.findByName("rukiye");
        return Lists.newArrayList(sts);
    }
    @PostMapping(value = "/add")
    public Students addStudent(HttpSession httpSession, Students student){
        Students sts =  studentsRepository.save(student);
        return sts;
    }
    @RequestMapping(value = "/delete",  method = RequestMethod.DELETE)
    public void deleteStudent(HttpSession httpSession, Students students){
      studentsRepository.delete(students);

    }
    @PutMapping("/update/{student_ref}")
    public Students updatePost(@PathVariable Long student_ref, Students student) {
        return studentsRepository.findById(student_ref).map(post -> {
            post.setAdress1(student.getAdress1());
            post.setStd_name(student.getStd_name());
            post.setStd_surname(student.getStd_surname());
            post.setBirthday(student.getBirthday());
            post.setBirthplace(student.getBirthplace());
            post.setSaint(student.getSaint());
            post.setPhone1(student.getPhone1());
            post.setPhone2(student.getPhone2());
            post.setMail(student.getMail());
            post.setSchool(student.getSchool());
            post.setGrade(student.getGrade());
            post.setStatus(student.getStatus());
            post.setNote(student.getNote());
            post.setProgram(student.getProgram());
            post.setProfileType(student.getProfileType());
            return studentsRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + student_ref + " not found"));


    }
}
