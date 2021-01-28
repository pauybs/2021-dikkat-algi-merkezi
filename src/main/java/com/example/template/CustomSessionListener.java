package com.example.template;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.concurrent.atomic.AtomicInteger;

@WebListener
public class CustomSessionListener implements HttpSessionListener {

    private static final Logger LOG= LoggerFactory.getLogger(CustomSessionListener.class);
    private final AtomicInteger counter = new AtomicInteger();

    @Override
    public void sessionCreated(HttpSessionEvent se) {

        LOG.info("New session is created. Adding Session to the counter.");
        counter.incrementAndGet();  //incrementing the counter
        LOG.info("Total active session are {} ",counter.get());
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        LOG.info("Session destroyed. Removing the Session from the counter.");
        counter.decrementAndGet();  //decrementing counter
        LOG.info("Total active session are {} ",counter.get());
    }
}