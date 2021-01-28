package com.example.template;


import com.mysql.cj.Session;
import com.mysql.cj.jdbc.MysqlDataSource;
import org.hibernate.SessionFactory;
import org.hibernate.boot.model.naming.ImplicitNamingStrategyComponentPathImpl;
import org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl;
import org.hibernate.exception.DataException;
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder;

import javax.security.auth.login.Configuration;
import javax.sql.DataSource;
import javax.xml.crypto.Data;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class HibernateManager {
  /*  public static final String PACKAGES_ADDRESSES = "com.example.template.model.db.addresses";
    public static final String PACKAGES_MASTER = "com.example.template.model.db.master";


    public static MysqlDataSource createMysqlDataSource() throws SQLException {
        MysqlDataSource datasource = new MysqlDataSource();
        datasource.setPassword("r.s_ayran342");
        datasource.setUser("root");
        datasource.setURL("jdbc:mysql://localhost:3306/neurosound?useUnicode=true&useLegacyDatetimeCode=false&serverTimezone=Turkey");
        return datasource;
    }


    public static LocalSessionFactoryBuilder createLocalSessionFactoryBuilder(DataSource ds, String packages) {
        LocalSessionFactoryBuilder sessionFactoryBuilder = new LocalSessionFactoryBuilder(ds);
        sessionFactoryBuilder.setProperty("hibernate.hbm2ddl.auto", "update");
        sessionFactoryBuilder.setProperty("hibernate.show_sql", "true");
        sessionFactoryBuilder.setProperty("logging.level.org.hibernate.SQL", "debug");
        sessionFactoryBuilder.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL8Dialect");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.min_size", "5");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.max_size", "20");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.acquire_increment", "5");
        sessionFactoryBuilder.setProperty("hibernate.c3p0.timeout", "60");
        sessionFactoryBuilder.setProperty("serverTimezone","Europe/Istanbul");
        sessionFactoryBuilder.scanPackages(packages);
        sessionFactoryBuilder.setImplicitNamingStrategy(new ImplicitNamingStrategyComponentPathImpl());
        sessionFactoryBuilder.setPhysicalNamingStrategy(new PhysicalNamingStrategyStandardImpl());

        return sessionFactoryBuilder;
    }
*/
}
