package com.example.template.controller;

import com.example.template.GlobalVariables;
import com.example.template.model.master.Auth;
import com.example.template.model.user.Students;
import com.example.template.session.SessionAdapter;
import com.example.template.sevices.RootService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/")
public class RootController  {
    @Autowired
    RootService rootService;
    @PostMapping(value = "/login",params = {"title","password", "code"})
    public Auth loginWithName(HttpSession httpSession, HttpServletRequest request,
                                 @RequestParam String title,
                                 @RequestParam String password,
                                @RequestParam String code) {
        Auth user = new Auth();
        try {
            user = rootService.loginUser(title, password, code, httpSession, request);
            new SessionAdapter(httpSession).setUser(user);
        }catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }

        return user;
    }
    @PostMapping(value = "/add",params = {"title","password", "code"})
    public void add(Auth auth, @RequestParam String title, @RequestParam String password, @RequestParam String code) throws Exception {
        Auth auth1 = new Auth();
        Auth auth2=new Auth();
        auth1 = rootService.findByCode(code);
        auth2 = rootService.findByTitle(title);
        if(auth1 == null & auth2 == null ){
            rootService.saveUser(auth);
            rootService.createDatabaseByCode(title,password, code);
        }else{
            throw new Exception("Veri tabanı adı veya kullanıcı adı zaten var");
        }
    }
    @GetMapping(value = "/control")
    public String sendId(HttpServletRequest request,HttpSession httpSession, GlobalVariables v, Auth auth) throws Exception {
        if( v != null ) {
            return rootService.secID();
        }  else {
            throw new Exception("");
        }

    }
}
