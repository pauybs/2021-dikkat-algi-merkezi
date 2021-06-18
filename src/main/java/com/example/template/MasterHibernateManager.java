package com.example.template;

import com.example.template.repositories.user.AdviceRepository;
import com.example.template.repositories.user.StudentsRepository;
import com.mysql.cj.jdbc.MysqlDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import java.sql.SQLException;
@Configuration
@EnableJpaRepositories(
        basePackages = "com.example.template.repositories",
        entityManagerFactoryRef = "getMasterSessionFactory",
        transactionManagerRef = "masterTransactionManager",

        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {
                        AdviceRepository.class, StudentsRepository.class})
        }
)
//@EntityScan("com.example.template.model")
public class MasterHibernateManager {

    @Bean
    @Primary
    public SessionFactory getMasterSessionFactory() throws SQLException {
        SessionFactory sessionFactory ;
        org.springframework.orm.hibernate5.LocalSessionFactoryBuilder builder = com.example.template.LocalSessionFactoryBuilder
                .createLocalSessionFactoryBuilder(MasterHibernateManager.createMysqlDataSource(), com.example.template.LocalSessionFactoryBuilder.PACKAGES_MASTER);

        sessionFactory = builder.buildSessionFactory();
        return sessionFactory;
    }

    @Bean
    @Primary
    public static MysqlDataSource createMysqlDataSource() throws SQLException {
        MysqlDataSource datasource = new MysqlDataSource();
        datasource.setPassword("pass");
        datasource.setUser("root");
        datasource.setURL("jdbc:mysql://localhost:3306/master?useUnicode=true&useLegacyDatetimeCode=false&serverTimezone=Turkey");
        return datasource;
    }
    @Bean
    @Primary
    public PlatformTransactionManager masterTransactionManager() throws SQLException {

        JpaTransactionManager transactionManager
                = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
                getMasterSessionFactory());
        return transactionManager;
    }
}
