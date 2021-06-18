package com.example.template;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class GlobalMethods {

    public static String getClientMacAddress(){
        return "";
    }


    public static String getClientIP(HttpServletRequest request){
        String remoteAddr = "";

        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }

        return remoteAddr;
    }


    public GlobalVariables checkUser(HttpServletRequest request, HttpSession httpSession, String securityId) throws Exception {
        GlobalVariables userVariables = null;
        for (GlobalVariables v: GlobalVariables.listGV) {
            if(v.getSecurityID().equals(securityId) &&
                    v.getHttpSessionID().equals(httpSession.getId()) &&
                    v.getRequestIp().equals(request.getRemoteAddr())
            ) {
                userVariables = v;
            }
        }

        if(userVariables != null)
            return userVariables;
        else
            throw new Exception("hata");

    }
}
