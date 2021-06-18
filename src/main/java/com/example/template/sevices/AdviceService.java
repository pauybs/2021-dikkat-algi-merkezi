package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Advice;
import com.example.template.model.user.Students;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdviceService {
    List<Advice> findAll(GlobalVariables v);
    public Advice saveAdvice(GlobalVariables v, Advice _advice);
    public Advice findByRef(GlobalVariables v, Long _ref);
    Advice deleteAdvice(GlobalVariables v, Advice advice);
    List<Advice> findByTestsRef(GlobalVariables v, Long tests_ref);



}
