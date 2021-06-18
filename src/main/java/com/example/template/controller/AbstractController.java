package com.example.template.controller;

import com.example.template.GlobalMethods;
import com.example.template.GlobalVariables;
import org.springframework.http.HttpRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class AbstractController {
    GlobalMethods gm = new GlobalMethods();
    GlobalVariables v;

    protected GlobalVariables checkUser(HttpServletRequest request, HttpSession session, String ssid) throws Exception {
        return  gm.checkUser(request,session,ssid);
    }
}
