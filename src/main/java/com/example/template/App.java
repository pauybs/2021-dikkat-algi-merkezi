package com.example.template;


import com.example.template.repositories.user.*;
import com.example.template.sevices.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.*;


//

//@SpringBootApplication(exclude = DataSourceAutoConfiguration.class, scanBasePackages={"com.example.template"}) //
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class, scanBasePackages={"com.example.template"})
public class App {


	public static void main(String[] args) throws Exception {
		SpringApplication.run(App.class, args);
	}

	@Bean
	public ServletListenerRegistrationBean<CustomSessionListener> sessionListenerWithMetrics() {
		ServletListenerRegistrationBean<CustomSessionListener> listenerRegBean =
				new ServletListenerRegistrationBean<>();

		listenerRegBean.setListener(new CustomSessionListener());
		return listenerRegBean;
	}

	@Bean(name = "adviceService")
	public AdviceService adviceService() {return new AdviceServiceImp();}
	@Bean(name = "adviceRepository")
	public AdviceRepository adviceRepository() {return new AdviceRepImp();}

	@Bean(name = "studentsService")
	public StudentsService studentsService() {
		return new StudentsServiceImp();
	}

	@Bean(name = "studentsRepository")
	public StudentsRepository studentsRepository() {
		return new StudentRepImp();
	}
	@Bean(name = "testsService")
	public TestsService testsService() {
		return new TestsServiceImp();
	}
	@Bean(name = "testsRepository")
	public TestsRepository testsRepository() {
		return new TestsRepoImp();
	}
	@Bean(name = "testStudentService")
	public TestStudentService testStudentService() {
		return new TestStudentServiceImp();
	}
	@Bean(name = "subTestService")
	public SubTestService subTestService() {
		return new SubTestServiceImp();
	}
	@Bean(name = "subTestResultService")
	public SubTestResultService subTestResultService() {
		return new SubTestResultServiceImp();
	}
	@Bean(name = "testStudentRepository")
	public TestStudentRepository testStudentRepository() {
		return new TestStudentRepoImp();
	}
	@Bean(name = "subTestRepository")
	public SubTestRepository subTestRepository() {
		return new SubTestRepoImp();
	}
	@Bean(name = "subTestResultRepository")
	public SubTestResultRepository subTestResultRepository() {
		return new SubTestResultRepoImp();
	}
	@Bean(name = "rootService")
	public RootService rootService() {
		return new RootServiceImp();
	}

	@Bean(name = "adminService")
	public AdminService adminService() {
		return new AdminServiceImp();
	}

}
