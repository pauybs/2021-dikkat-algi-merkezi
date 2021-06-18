package com.example.template.repositories.user;


import com.example.template.GlobalVariables;
import com.example.template.model.user.Students;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentsRepository{
    Students findByRef(GlobalVariables v, Long _ref);
    List<Students> findAll(GlobalVariables v);
    Students save(GlobalVariables v, Students students);
    //Students update(GlobalVariables v, Students students);

    Students deleteStudent(GlobalVariables v, Students students);
}
