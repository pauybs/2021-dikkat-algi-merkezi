package com.example.template.controller;

import com.example.template.model.db.master.Auth;
import com.example.template.repositories.AuthRepository;
import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

/*
    @GetMapping("/login")
    public String login(Model model, String error, String logout) {
        if (error != null)
            model.addAttribute("error", "Your username and password is invalid.");

        if (logout != null)
            model.addAttribute("message", "You have been logged out successfully.");

        return "login";
    }*/

    @Autowired
    AuthRepository authRepository;
    @GetMapping(value = "/list")
    public List<Auth> listAuth(HttpSession httpSession){
        return Lists.newArrayList(authRepository.findAll());
    }
    /*
    @GetMapping(value = "/list")
    public List<Auth> listAuth(HttpSession httpSession){
        AuthDao dao =  new AuthDao(masterSessionFactory);
        return dao.getAll();
    }
    @PostMapping(value = "/register")
    public void registerAuth(HttpSession httpSession, Auth auth)  {
        AuthDao dao =  new AuthDao(masterSessionFactory);
        dao.insertUpdateTransactional(auth);
    }
    */



}
