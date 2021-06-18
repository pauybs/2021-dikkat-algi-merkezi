package com.example.template.repositories.user;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Advice;
import com.example.template.model.user.Students;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdviceRepository  {
    Advice findByRef(GlobalVariables v, Long _ref);
    List<Advice> findByTestsRef(GlobalVariables v, Long tests_ref);
    List<Advice> findAll(GlobalVariables v);
    Advice save(GlobalVariables v, Advice advice);
    Advice deleteAdvice(GlobalVariables v, Advice advice);

}
