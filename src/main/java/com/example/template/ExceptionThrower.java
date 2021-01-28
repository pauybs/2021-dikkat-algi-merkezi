package com.example.template;

import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public class ExceptionThrower {

    public static void unauthorized(){
        throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED);
    }

    public static void badRequest(){
        throw new HttpClientErrorException(HttpStatus.BAD_REQUEST);
    }

    public static void notFound(){
        throw new HttpClientErrorException(HttpStatus.NOT_FOUND);
    }

    public static void forbidden(){
        throw new HttpClientErrorException(HttpStatus.FORBIDDEN);
    }


}
