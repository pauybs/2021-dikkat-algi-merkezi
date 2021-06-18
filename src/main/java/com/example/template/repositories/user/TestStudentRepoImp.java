package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTestResult;
import com.example.template.model.user.TestStudent;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class TestStudentRepoImp implements TestStudentRepository{
    SessionFactory userSessionFactory;
    @Override
    public TestStudent findByTestsRefAndStudentsRefAndRef(GlobalVariables v, Long tests_ref, Long students_ref, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return (TestStudent) session.createQuery("FROM TestStudent t where t.tests.ref=:tests_ref and t.students.ref=:students_ref and t.ref=:ref")
                .setParameter("ref", ref).setParameter("tests_ref",tests_ref).setParameter("students_ref", students_ref).uniqueResult();
    }

    @Override
    public List<TestStudent> findByTestsRefAndStudentsRef(GlobalVariables v, Long tests_ref, Long students_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<TestStudent> testStudent = session.createQuery("FROM TestStudent t where t.tests.ref = :tests_ref and t.students.ref = :students_ref")
                .setParameter("tests_ref",tests_ref).setParameter("students_ref", students_ref).list();
        return testStudent;

    }

    @Override
    public List<TestStudent> findByStudentsRef(GlobalVariables v, Long students_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM TestStudent t where t.students.ref=:students_ref")
                .setParameter("students_ref", students_ref).list();
    }

    @Override
    public List<TestStudent> findByTestsRef(GlobalVariables v, Long tests_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM TestStudent t where t.tests.ref=:tests_ref ")
                .setParameter("tests_ref",tests_ref).list();
    }

    @Override
    public TestStudent findByRef(GlobalVariables v, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return (TestStudent) session.createQuery("FROM TestStudent t where t.ref=:ref").setParameter("ref", ref).uniqueResult();
    }

    @Override
    public List<TestStudent> findAll(GlobalVariables v) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<TestStudent> testStudents = session.createQuery("FROM TestStudent").list();
        return testStudents;
    }

    @Override
    public TestStudent saveTestStudent(GlobalVariables v, TestStudent testStudent) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(testStudent);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
        return testStudent;

    }

    @Override
    public TestStudent deleteTestStudent(GlobalVariables v, TestStudent testStudent) {
        return null;
    }
}
