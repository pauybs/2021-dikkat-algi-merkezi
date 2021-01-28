package com.example.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Locale;

@SpringBootApplication
		//(exclude = DataSourceAutoConfiguration.class)
//@EnableJpaRepositories("com.example.repositories")
//@ComponentScan("com.example.repositories")
@EnableScheduling
public class App {


	public static void main(String[] args) throws Exception {
		SpringApplication.run(App.class, args);
	}

	/*
	@Bean(name = "masterSessionFactory")
	public SessionFactory getMasterSessionFactory() throws SQLException {
		SessionFactory sessionFactory ;
		LocalSessionFactoryBuilder builder = HibernateManager.createLocalSessionFactoryBuilder(HibernateManager.createMysqlDataSource(), HibernateManager.PACKAGES_MASTER);
		sessionFactory = builder.buildSessionFactory();
		return sessionFactory;
	}
	*/


}
