package com.example.template;

import com.example.template.model.master.Admin;
import com.example.template.model.user.Advice;
import com.example.template.model.master.Auth;
import com.example.template.model.user.Students;
import org.hibernate.boot.model.naming.ImplicitNamingStrategyComponentPathImpl;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;

import javax.sql.DataSource;

public class LocalSessionFactoryBuilder {

    public static final String PACKAGES_MASTER = "com.example.template.model.master";
    public static final String PACKAGES_USER = "com.example.template.model.user"; //KULLANICI MODELELRİ


    public static org.springframework.orm.hibernate5.LocalSessionFactoryBuilder createLocalSessionFactoryBuilder(DataSource ds, String packages) {
        org.springframework.orm.hibernate5.LocalSessionFactoryBuilder sessionFactoryBuilder = new org.springframework.orm.hibernate5.LocalSessionFactoryBuilder(ds);
        if (packages == PACKAGES_USER) {
            sessionFactoryBuilder.addAnnotatedClasses(Advice.class).addAnnotatedClasses(Students.class);
        }else if (packages == PACKAGES_MASTER){
            sessionFactoryBuilder.addAnnotatedClass(Admin.class).addAnnotatedClass(Auth.class);//.addAnnotatedClass(Advice.class);

        }

        sessionFactoryBuilder.setProperty("hibernate.hbm2ddl.auto", "update");
        sessionFactoryBuilder.setProperty("hibernate.show_sql", "true");
        sessionFactoryBuilder.setProperty("logging.level.org.hibernate.SQL", "debug");
        sessionFactoryBuilder.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.min_size", "5");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.max_size", "20");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.acquire_increment", "5");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.timeout", "60");
        sessionFactoryBuilder.setProperty("serverTimezone","Europe/Istanbul");
        //  sessionFactoryBuilder.scanPackages(packages);
        sessionFactoryBuilder.setImplicitNamingStrategy(new ImplicitNamingStrategyComponentPathImpl());
        sessionFactoryBuilder.setPhysicalNamingStrategy(new PhysicalNamingStrategyStandardImpl());

        return sessionFactoryBuilder;
    }
}
