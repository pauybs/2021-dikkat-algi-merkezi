package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Students;

import java.util.List;

public interface StudentsService {
    List<Students> findAll(GlobalVariables v);
    Students saveStudent(GlobalVariables v, Students students);
    //Students updateStudent(GlobalVariables v, Students students);

    Students deleteStudent(GlobalVariables v, Students students);
    Students findByRef(GlobalVariables v, Long ref);
}
