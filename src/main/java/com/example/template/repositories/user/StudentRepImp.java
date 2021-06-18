package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Students;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.List;

public class StudentRepImp implements StudentsRepository {

    SessionFactory userSessionFactory;

    @Override
    public Students findByRef(GlobalVariables v, Long ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return (Students) session.createQuery("FROM Students t where t.ref=:ref").setParameter("ref", ref).uniqueResult();
    }

    @Override
    public List<Students> findAll(GlobalVariables v) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<Students> listStudents = session.createQuery("FROM Students").list();
        return listStudents;
    }

    @Override
    public Students save(GlobalVariables v, Students students) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(students);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
        return students;
    }


    @Override
    public Students deleteStudent(GlobalVariables v, Students students) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.delete(students);
            transaction.commit();
        }catch (Exception e) {
            transaction.rollback();
            throw e;
        }

        return students;
    }
}
