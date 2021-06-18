package com.example.template.controller;

import com.example.template.model.user.Advice;
import com.example.template.model.user.Students;
import com.example.template.model.user.Tests;
import com.example.template.sevices.AdviceService;
import com.example.template.sevices.TestsService;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;


@RestController
@RequestMapping("/advice")
public class AdviceController extends AbstractController {

    private AdviceService adviceService;
    @Autowired
    public void setAdviceService(AdviceService adviceService) {
        this.adviceService = adviceService;
    }


    private TestsService testsService;
    @Autowired
    public void setTestsService(TestsService testsService) {
        this.testsService = testsService;
    }

    @GetMapping(value = "/list/{ssid}")
    public List<Advice> list(HttpServletRequest request, HttpSession httpSession,@PathVariable(value = "ssid") String ssid) throws Exception {
        Iterable<Advice> sts  = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            sts= adviceService.findAll(v);
            return Lists.newArrayList(sts);
        } else {
            throw new Exception("");
        }
    }
    @GetMapping(value = "/tests/{tests_ref}/{ssid}")
    public List<Advice> filterAllTest(HttpServletRequest request, HttpSession httpSession,
                                      @PathVariable(value = "ssid") String ssid,
                                      @PathVariable (value = "tests_ref") Long tests_ref,
                                      Advice advice) throws Exception {
        Iterable<Advice> sts  = null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            sts = adviceService.findByTestsRef(v, tests_ref);
            return Lists.newArrayList(sts);
        } else {
            throw new Exception("");
        }
    }

    @PostMapping("/tests/{tests_ref}/add/{ssid}")
    public ResponseEntity<Advice> add(HttpServletRequest request, HttpSession httpSession,
                                      @PathVariable(value = "ssid") String ssid,
                                      @PathVariable(value = "tests_ref") Long tests_ref, Advice advice) throws Exception {

        Tests tests=null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            tests =  testsService.findByRef(v, tests_ref);
            advice.setTests(tests);
            Advice savedAdvice = adviceService.saveAdvice(v, advice);
            return ResponseEntity.ok(savedAdvice);
        }  else {
            throw new Exception("");
        }

    }
    @PutMapping("/tests/{tests_ref}/ad/{ref}/put/{ssid}")
    public ResponseEntity<Advice> update(HttpServletRequest request, HttpSession httpSession,
                                         @PathVariable(value = "ssid") String ssid ,
                                              Advice advice) throws Exception {
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {
            advice.setRef(advice.getRef());
            adviceService.saveAdvice(v, advice);
            return ResponseEntity.noContent().build();
        }  else {
            throw new Exception("");
        }
    }
    @DeleteMapping(value = "/delete/{ssid}")
    public Advice delete(HttpServletRequest request, HttpSession httpSession,
                                         @PathVariable(value = "ssid") String ssid ,
                                         @RequestParam(value = "ref") Long ref, Advice advice) throws Exception {
        Advice sts =  null;
        v = checkUser(request, httpSession, ssid);
        if( v != null ) {

            sts=adviceService.deleteAdvice(v, advice);
            return sts;
        }  else {
            throw new Exception("");
        }
    }
}
