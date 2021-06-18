package com.example.template.controller;

import com.example.template.model.master.Admin;
import com.example.template.sevices.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping(value = "/login",params = {"title","password"})
    public Admin adminLogin(HttpSession httpSession,
                            @RequestParam String title,
                            @RequestParam String password) throws Exception {
        Admin admin = adminService.loginAdmin(title, password);

        return admin;
    }
}
