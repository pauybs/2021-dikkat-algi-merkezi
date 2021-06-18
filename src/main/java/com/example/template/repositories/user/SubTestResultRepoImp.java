package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTestResult;
import com.example.template.model.user.Tests;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class SubTestResultRepoImp implements SubTestResultRepository {
    SessionFactory userSessionFactory;
    @Override
    public List<SubTestResult> findBySubTestRef(GlobalVariables v, Long sub_test_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM SubTestResult t where t.subTest.ref=:sub_test_ref")
                .setParameter("sub_test_ref", sub_test_ref).list();
    }

    @Override
    public List<SubTestResult> findBySubTestRefAndRef(GlobalVariables v, Long sub_test_ref, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM SubTestResult t where t.subTest.ref=:sub_test_ref and t.ref=:ref")
                .setParameter("sub_test_ref", sub_test_ref).setParameter("ref", ref).list();
    }

    @Override
    public SubTestResult findByRef(GlobalVariables v, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return (SubTestResult) session.createQuery("FROM SubTestResult t where t.ref=:ref").setParameter("ref", ref).uniqueResult();
    }

    @Override
    public List<SubTestResult> findAll(GlobalVariables v) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<SubTestResult> subTestResults = session.createQuery("FROM SubTestResult").list();
        return subTestResults;
    }

    @Override
    public SubTestResult saveSubTestResult(GlobalVariables v, SubTestResult subTestResult) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(subTestResult);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
        return subTestResult;

    }

    @Override
    public SubTestResult deleteSubTestResult(GlobalVariables v, SubTestResult subTestResult) {
        return null;
    }
}
