package com.example.template.session;


import com.example.template.model.db.master.Auth;

import javax.servlet.http.HttpSession;

public class SessionAdapter {
    public static final String USER = "USER";

    private final HttpSession session;

    public SessionAdapter(HttpSession session){
        this.session = session;
    }

    public Auth getUser(){
        Auth obj = (Auth) session.getAttribute(USER);
        return obj;
    }

    public void setUser(Auth obj){
        session.setAttribute(USER,obj);
    }
}
