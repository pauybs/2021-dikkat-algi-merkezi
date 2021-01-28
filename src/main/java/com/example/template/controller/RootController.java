package com.example.template.controller;

import com.example.template.App;
import com.example.template.ExceptionThrower;
import com.example.template.model.db.master.Auth;
import com.example.template.model.db.master.Students;
import com.example.template.repositories.AuthRepository;
import com.example.template.repositories.StudentsRepository;
import com.example.template.session.SessionAdapter;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@Controller
public class RootController  {

    @Autowired
    AuthRepository authRepository;

    @Autowired
    StudentsRepository studentsRepository;

    private final Logger logger = LoggerFactory.getLogger(RootController.class);

    @GetMapping("/")
    public String index() {
        return "index";
    }
    @PostMapping(value = "/login",params = {"name","password"})
    public String loginWithName(HttpSession httpSession,
                                 @RequestParam String title,
                                 @RequestParam String password) {
        Auth user = authRepository.findByName(title);
        if (!StringUtils.equals(user.getPassword(), password)) {
            ExceptionThrower.forbidden();
        }
        new SessionAdapter(httpSession).setUser(user);
        return httpSession.getId();
    }
    @GetMapping("/main")
    public String main() {
        return "main"; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/student_add")
    public String student_add() {
        return "student_add"; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/student_add?id={id}")
    public String student_put(@PathVariable(value="id") Long student_ref) {

        return "student_add?id=" + student_ref; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/student_list")
    public String student_list() {
        return "student_list"; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/student_profile")
    public String student_profile() {
        return "student_profile"; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/test_profile")
    public String test_profile() {
        return "test_profile"; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/test_profile?id={id}")
    public String test_add(@PathVariable(value="id") Long student_ref) {
        return "test_profile?id="+student_ref; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/test_profile?id={id}&ref={ref}")
    public String test_son(@PathVariable(value="id") Long student_ref,
                           @PathVariable(value="ref") Long test_ref) {
        return "test_profile?id="+student_ref+"&ref="+test_ref; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
    @GetMapping("/calendar")
    public String calendar() {
        return "calendar"; // this returns the template name to be rendered from resources/templates. You don't need to provide the extension.
    }
/*
    @PostMapping(value = "/login",params = {"name","code","password"})
    public String loginWithPhone(HttpSession httpSession,
                                 @RequestParam String name,
                                 @RequestParam String code,
                                 @RequestParam String password) {

        Auth user = authRepository.findByCode(code);
        user = authRepository.findByName(name);
        if (!StringUtils.equals(user.getPassword(), password)) {
            ExceptionThrower.forbidden();
        }

        new SessionAdapter(httpSession).setUser(user);
        return httpSession.getId();
    }

*/


/*
    @GetMapping("/version")
    public String version() {
        return App.VERSION;
    }


    @PostMapping(value = "/login",params = {"title","password"})
    public String loginWithTitle(HttpSession httpSession,
                        @RequestParam String title,
                        @RequestParam String password) {
        UserDao userDao = new UserDao(masterSessionFactory);

        User user = userDao.getByTitle(title);
        if (!StringUtils.equals(user.getPassword(), password)) {
            ExceptionThrower.forbidden();
        }

        new SessionAdapter(httpSession).setUser(user);
        return httpSession.getId();
    }

    @PostMapping(value = "/login",params = {"phone","password"})
    public String loginWithPhone(HttpSession httpSession,
                                 @RequestParam String phone,
                                 @RequestParam String password) {
        UserDao userDao = new UserDao(masterSessionFactory);

        User user = userDao.getByPhone(phone);
        if (!StringUtils.equals(user.getPassword(), password)) {
            ExceptionThrower.forbidden();
        }

        new SessionAdapter(httpSession).setUser(user);
        return httpSession.getId();
    }



    @PostMapping("/token")
    @UserRoleAnnotation(userType = User.UserType.Student)
    public void updateToken(HttpSession httpSession, @RequestParam String token){
        SessionAdapter sessionAdapter = new SessionAdapter(httpSession);
        UserDao userDao = new UserDao(masterSessionFactory);
        User user = sessionAdapter.getUser();

        userDao.deleteToken(token);

        if(user.getUserType() == User.UserType.Student){
            StudentDao studentDao = new StudentDao(masterSessionFactory);
            Student student =  studentDao.get(user.getRef());
            student.setToken(token);
            studentDao.insertUpdateTransactional(student);
            sessionAdapter.setUser(student);
        }

        if(user.getUserType() == User.UserType.Teacher){
            TeacherDao teacherDao = new TeacherDao(masterSessionFactory);
            Teacher teacher = teacherDao.get(user.getRef());
            teacher.setToken(token);
            teacherDao.insertUpdateTransactional(teacher);
            sessionAdapter.setUser(teacher);
        }

    }

    @GetMapping("/remember")
    @UserRoleAnnotation(userType = User.UserType.Student)
    public void rememberMe(HttpSession httpSession, HttpServletResponse response) throws JsonProcessingException {
        SessionAdapter sessionAdapter = new SessionAdapter(httpSession);
        User user = sessionAdapter.getUser();

        RememberMe rememberMe = new RememberMe();
        rememberMe.phone = user.getPhone();
        rememberMe.expirationTime = LocalDateTime.now().plusDays(14);
        rememberMe.md5Hash = rememberMe.generateMd5(user.getPassword());

        int maxAge = 3600 * 24 * 14;

        Cookie cookieTitle = new Cookie("phone",rememberMe.phone);
        cookieTitle.setMaxAge(maxAge);
        Cookie cookieExpirationTime = new Cookie("expirationTime",rememberMe.expirationTimeString());
        cookieExpirationTime.setMaxAge(maxAge);
        Cookie cookieMd5 = new Cookie("md5Hash",rememberMe.md5Hash);
        cookieMd5.setMaxAge(maxAge);

        response.addCookie(cookieTitle);
        response.addCookie(cookieExpirationTime);
        response.addCookie(cookieMd5);

        response.setStatus(HttpStatus.OK.value());
    }

    @PostMapping("teacher/register")
    public void registerTeacher(HttpSession httpSession,
                         @RequestBody Teacher teacher) throws FirebaseAuthException {

        TeacherDao dao = new TeacherDao(masterSessionFactory);
        dao.insertTransactional(teacher);
    }

    @PostMapping("student/register")
    public void registerStudent(HttpSession httpSession,
                         @RequestBody Student student) throws FirebaseAuthException {
        StudentDao dao = new StudentDao(masterSessionFactory);

        dao.insertTransactional(student);
    }

    @PostMapping("/logout")
    @UserRoleAnnotation(userType = User.UserType.Student)
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
    }
*/
}
