package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Advice;
import com.example.template.model.user.TestStudent;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public class AdviceRepImp implements AdviceRepository {

    SessionFactory userSessionFactory;

    @Override
    public Advice findByRef(GlobalVariables v, Long _ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Advice advice= (Advice) session.createQuery("FROM ref"+_ref).list();
        return advice;
    }

    @Override
    public List<Advice> findByTestsRef(GlobalVariables v, Long tests_ref) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        return session.createQuery("FROM Advice t where t.tests.ref=:tests_ref ").setParameter("tests_ref",tests_ref).list();
    }

    @Override
    public List<Advice> findAll(GlobalVariables v) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        List<Advice> listAdvice=session.createQuery("FROM Advice").list();
        return listAdvice;
    }

    @Override
    public Advice save(GlobalVariables v, Advice advice) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.saveOrUpdate(advice);
            transaction.commit();
        } catch (Exception e) {
            transaction.rollback();
            throw e;
        }
        return advice;

    }

    @Override
    public Advice deleteAdvice(GlobalVariables v, Advice advice) {
        userSessionFactory = v.getLocalSessionFactory();
        Session session = userSessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        try {
            session.delete(advice);
            transaction.commit();
        }catch (Exception e) {
            transaction.rollback();
            throw e;
        }

        return advice;
    }


}
