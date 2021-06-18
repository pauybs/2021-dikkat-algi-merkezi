package com.example.template.sevices;

import com.example.template.GlobalMethods;
import com.example.template.GlobalVariables;
import com.example.template.HibernateManager;
import com.example.template.LocalSessionFactoryBuilder;
import com.example.template.model.master.Auth;
import com.example.template.repositories.master.AuthRepository;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;


import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Base64;

@Service

public class RootServiceImp implements  RootService{

    @Autowired
    AuthRepository authRepository ;

    @PersistenceUnit
    private SessionFactory getMasterSessionFactory;

    GlobalVariables v = new GlobalVariables();
    String secID;



    @Override
    public Auth loginUser(String _title, String _password, String _code, HttpSession httpSession, HttpServletRequest request) throws Exception {

        Auth user = authRepository.findByTitleAndPasswordAndCode(_title, _password, _code);

        if(user != null) {
        //    GlobalVariables.listGV.add()

      //      if(v.listGV.) {

      //      }

                v.setUserInfo(user);
                v.setUserName(_title);
                v.setUserPassword(_password);
                v.setMasterSessionFactory(getMasterSessionFactory);
                v.setLocalSessionFactory(HibernateManager.getUserSessionFactory(user.getCode()));

               // v.setMacID(GlobalMethods.getClientMacAddress());
                v.setRequestIp(request.getRemoteAddr());
                v.setHttpSessionID(httpSession.getId());


            Base64.Encoder encoder = Base64.getUrlEncoder();
            secID=encoder.encodeToString((user + _password).getBytes() );
            v.setSecurityID(secID);

            v.listGV.add(v);

            user.setSecurityID(v.getSecurityID());
            return user;
        } else {
            throw new Exception("Yanlış bilgi girdiniz");
        }

    }

    @Override
    public Auth saveUser(Auth auth) {

        return authRepository.save(auth);
    }
    @Override
    public String secID() {
        return secID;
    }
    @Override

    public Auth findByCode(String _code) {
        return authRepository.findByCode(_code);
    }

    @Override
    public Auth findByTitle(String _title) throws Exception {
        return authRepository.findByTitle(_title);
    }

   /* @Override
    public String securityID(String code) {
        return authRepository.findBySecurityID(code);
    }*/

    @Override
    public void createDatabaseByCode(String title, String _password,String code) throws Exception{
        getMasterSessionFactory.getCurrentSession().createSQLQuery("CREATE DATABASE " + code).executeUpdate();
        HibernateManager.getUserSessionFactory(code);

    }
  //  @Bean(name = "userSessionFactory")
 //   @Primary
  //  @Qualifier("userDataSource")
 /*  public SessionFactory getUserSessionFactory(String _title, String _password, String _code) throws SQLException {

        LocalSessionFactoryBuilder builder = LocalSessionFactoryBuilder.createLocalSessionFactoryBuilder(
                HibernateManager.createLocalMysqlDataSource(),
                LocalSessionFactoryBuilder.PACKAGES_USER);
        emf = builder.buildSessionFactory();
        return builder;
    }*/

}
