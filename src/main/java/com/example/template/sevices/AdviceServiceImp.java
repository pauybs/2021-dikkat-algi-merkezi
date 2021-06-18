package com.example.template.sevices;


import com.example.template.GlobalVariables;
import com.example.template.model.user.Advice;
import com.example.template.repositories.user.AdviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdviceServiceImp implements AdviceService{

    @Autowired
    private AdviceRepository adviceRepository;
    @Override
    public List<Advice> findAll(GlobalVariables v) {
        return (List<Advice>) adviceRepository.findAll(v);
    }


    @Override
    public Advice saveAdvice(GlobalVariables v, Advice advice) {
        return adviceRepository.save(v, advice);
    }

    @Override
    public Advice findByRef(GlobalVariables v, Long _ref) {
        return adviceRepository.findByRef(v, _ref);
    }

    @Override
    public Advice deleteAdvice(GlobalVariables v, Advice advice) {
        return adviceRepository.deleteAdvice(v, advice);
    }

    @Override
    public List<Advice> findByTestsRef(GlobalVariables v, Long tests_ref) {
        return adviceRepository.findByTestsRef(v, tests_ref);
    }

}
