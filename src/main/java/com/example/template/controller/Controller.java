package com.example.template.controller;

import org.springframework.web.bind.annotation.GetMapping;

@org.springframework.stereotype.Controller
public class Controller {
    @GetMapping("/")
    public String index() {
        return "index";
    }
    @GetMapping("/main")
    public String main() { return "main";  }
    @GetMapping("/student_add")
    public String student_add() {return "student_add";}
    @GetMapping("/student_list")
    public String student_list() {return "student_list";}
    @GetMapping("/student_profile")
    public String student_profile() {
        return "student_profile";
    }
    @GetMapping("/test_profile")
    public String test_profile() {return "test_profile";}
    @GetMapping("/advice")
    public String advice() {return "advice"; }
    @GetMapping("/calendar")
    public String calendar() {return "calendar"; }
    @GetMapping("/moxo_result_add")
    public String moxo_result_add() {return "moxo_result_add"; }
    @GetMapping("/moxo_test_profile")
    public String moxo_test_profile() {return "moxo_test_profile"; }
    @GetMapping("/profil_olusturma_add")
    public String profil_olusturma_add() {return "profil_olusturma_add"; }
    @GetMapping("/result_add")
    public String result_add() {return "result_add"; }
    @GetMapping("/neuroadmin")
    public String neuroadmin() {return "neuroadmin"; }
    @GetMapping("/admin_page")
    public String admin_page() {return "admin_page"; }

}
