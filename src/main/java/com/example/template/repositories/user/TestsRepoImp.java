package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Advice;
import com.example.template.model.user.Students;
import com.example.template.model.user.Tests;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.management.Query;
import java.lang.annotation.Annotation;
import java.util.List;

public class TestsRepoImp implements TestsRepository {

    SessionFactory userSessionFactory;

    @Override
    public Tests findByRef(GlobalVariables v, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return (Tests) session.createQuery("FROM Tests t where t.ref=:ref").setParameter("ref", ref).uniqueResult();
    }

    @Override
    public List<Tests> findAll(GlobalVariables v) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<Tests> listTests = session.createQuery("FROM Tests").list();
        return listTests;
    }


}
