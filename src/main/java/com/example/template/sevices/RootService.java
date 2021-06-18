package com.example.template.sevices;

import com.example.template.model.master.Auth;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Transactional
@Service
public interface RootService {
    String secID();
    public Auth loginUser(String _title, String _password, String _code, HttpSession httpSession, HttpServletRequest request) throws Exception;

    public Auth saveUser(Auth auth);
    public Auth findByCode(String _code) throws Exception;
    public Auth findByTitle(String _title) throws Exception;
  //  public String securityID(String _code);


    void createDatabaseByCode(String title, String password, String code) throws Exception;

}
