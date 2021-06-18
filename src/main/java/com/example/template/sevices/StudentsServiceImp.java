package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Students;
import com.example.template.repositories.user.StudentsRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class StudentsServiceImp implements StudentsService {

    @Autowired
    StudentsRepository studentsRepository;

    @Override
    public List<Students> findAll(GlobalVariables v) {
        return  studentsRepository.findAll(v);
    }

    @Override
    public Students saveStudent(GlobalVariables v, Students students) {
        return studentsRepository.save(v, students);
    }

    //@Override
    //public Students updateStudent(GlobalVariables v, Students students) {
        //return studentsRepository.update(v,students);
   // }

    @Override
    public Students deleteStudent(GlobalVariables v, Students students) {
        return studentsRepository.deleteStudent(v, students);
    }

    @Override
    public Students findByRef(GlobalVariables v, Long ref) {
        return studentsRepository.findByRef(v, ref);
    }


}
