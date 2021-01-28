package com.example.template.model;

import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RememberMe {
    public String phone;
    public LocalDateTime expirationTime;
    public String md5Hash;

    public String expirationTimeString(){
        return expirationTime.format(DateTimeFormatter.ISO_DATE_TIME);
    }

    public String digestString(String password){
        String str =  phone + password + expirationTimeString();
        return str;
    }

    public String generateMd5(String password){
        byte[] md5 = DigestUtils.md5(digestString(password));
        String str = Hex.encodeHexString(md5);
        return str;
    }
}
