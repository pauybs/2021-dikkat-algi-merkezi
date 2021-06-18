package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTest;
import com.example.template.model.user.Tests;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;
import java.util.Map;

public class SubTestRepoImp implements SubTestRepository{
    SessionFactory userSessionFactory;
    @Override
    public List<Map<String, String>> findDistinctByName(GlobalVariables v, Long tests_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("SELECT DISTINCT name as name FROM SubTest where tests_ref=:tests_ref")
                .setParameter("tests_ref", tests_ref).list();
    }

    @Override
    public List<SubTest> findByTestStudentRefAndTestsRef(GlobalVariables v, Long test_student_ref, Long tests_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM SubTest t where t.testStudent.ref=:test_student_ref and t.tests.ref=:tests_ref")
                .setParameter("test_student_ref", test_student_ref).setParameter("tests_ref", tests_ref).list();
    }

    @Override
    public List<SubTest> findByTestStudentRefAndTestsRefAndRef(GlobalVariables v, Long test_student_ref, Long tests_ref, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM SubTest t where t.testStudent.ref=:test_student_ref and t.tests.ref=:tests_ref and t.ref=:ref")
                .setParameter("test_student_ref", test_student_ref).setParameter("tests_ref", tests_ref).setParameter("ref",ref).list();
    }

    @Override
    public List<SubTest> findByTestStudentRefAndTestsRefAndName(GlobalVariables v, Long test_student_ref, Long tests_ref, String name) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM SubTest t where t.test_student.ref=:test_student_ref and t.tests.ref=:tests_ref qan t.name=:name")
                .setParameter("test_student_ref", test_student_ref).setParameter("tests_ref", tests_ref).setParameter("name", name).list();
    }

    @Override
    public SubTest findByRef(GlobalVariables v, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return (SubTest) session.createQuery("FROM SubTest t where t.ref=:ref").setParameter("ref", ref).uniqueResult();
    }

    @Override
    public List<SubTest> findAll(GlobalVariables v) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<SubTest> listSubTest = session.createQuery("FROM SubTest").list();
        return listSubTest;
    }

    @Override
    public SubTest saveSubTest(GlobalVariables v, SubTest subTest) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(subTest);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
        return subTest;

    }

    @Override
    public SubTest deleteSubTest(GlobalVariables v, SubTest subTest) {
        return null;
    }
}
