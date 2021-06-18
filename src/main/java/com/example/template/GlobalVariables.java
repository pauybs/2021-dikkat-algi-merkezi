package com.example.template;

import com.example.template.model.master.Auth;
import org.hibernate.SessionFactory;

import java.util.ArrayList;

public class GlobalVariables {

    public static ArrayList<GlobalVariables> listGV= new ArrayList<GlobalVariables>();

    Auth userInfo;
    String userName;
    String userPassword;
    SessionFactory masterSessionFactory;
    SessionFactory localSessionFactory;

    String securityID;
    String macID;
    String requestIp;
    String httpSessionID;

    public static ArrayList<GlobalVariables> getListGV() {
        return listGV;
    }

    public static void setListGV(ArrayList<GlobalVariables> listGV) {
        GlobalVariables.listGV = listGV;
    }

    public Auth getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(Auth userInfo) {
        this.userInfo = userInfo;
    }

    public SessionFactory getMasterSessionFactory() {
        return masterSessionFactory;
    }

    public void setMasterSessionFactory(SessionFactory masterSessionFactory) {
        this.masterSessionFactory = masterSessionFactory;
    }

    public SessionFactory getLocalSessionFactory() {
        return localSessionFactory;
    }

    public void setLocalSessionFactory(SessionFactory localSessionFactory) {
        this.localSessionFactory = localSessionFactory;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getSecurityID() {
        return securityID;
    }

    public void setSecurityID(String securityID) {
        this.securityID = securityID;
    }


    public String getMacID() {
        return macID;
    }

    public void setMacID(String macID) {
        this.macID = macID;
    }

    public String getRequestIp() {
        return requestIp;
    }

    public void setRequestIp(String requestIp) {
        this.requestIp = requestIp;
    }

    public String getHttpSessionID() {
        return httpSessionID;
    }

    public void setHttpSessionID(String httpSessionID) {
        this.httpSessionID = httpSessionID;
    }
}
