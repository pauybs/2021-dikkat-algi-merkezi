package com.example.template;

import com.mysql.cj.jdbc.MysqlDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.context.support.GenericWebApplicationContext;
import java.sql.SQLException;
/*
@Configuration
@EnableJpaRepositories(
        basePackages = "com.example.template.repositories.user"//,
      //  entityManagerFactoryRef = "getUserSessionFactory",
     //   transactionManagerRef = "userTransactionManager"
)*/

public class HibernateManager {

    @Autowired
    private static GenericWebApplicationContext context;

    @Autowired
    private static AutowireCapableBeanFactory beanFactory;

    public static SessionFactory getUserSessionFactory(String dbname) throws SQLException {
        SessionFactory sessionFactory ;
        LocalSessionFactoryBuilder builder = com.example.template.LocalSessionFactoryBuilder
                .createLocalSessionFactoryBuilder(HibernateManager.createLocalMysqlDataSource(dbname), com.example.template.LocalSessionFactoryBuilder.PACKAGES_USER)
                .scanPackages("com.example.template.model.user", "com.example.template.repositories.user");

       // context.registerBean("studentsService", StudentsService.class, () -> new StudentsServiceImp());
        //context.registerBean("studentsRepository", StudentsRepository.class);

        //GenericWebApplicationContext context;
      /*  StudentsService bean = new StudentsServiceImp();
        AutowireCapableBeanFactory factory = context.getAutowireCapableBeanFactory();
        factory.autowireBean( bean );
        factory.initializeBean( bean, "studentsService" );
*/
      sessionFactory = builder.buildSessionFactory();


        return sessionFactory;
    }

    //@Bean
    public static MysqlDataSource createLocalMysqlDataSource(String dbname) throws SQLException {
      //  String dbname = "";
        MysqlDataSource datasource = new MysqlDataSource();
        datasource.setPassword("pass");
        datasource.setUser("root");
        datasource.setURL("jdbc:mysql://localhost:3306/"+dbname+"?useUnicode=true&useLegacyDatetimeCode=false&serverTimezone=Turkey");
        return datasource;
    }

    //@Bean
    public PlatformTransactionManager userTransactionManager(String dbname) throws SQLException {
        //String dbname = "";
        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(getUserSessionFactory(dbname));
        return transactionManager;
    }




}
