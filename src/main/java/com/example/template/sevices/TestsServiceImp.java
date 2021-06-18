package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Tests;
import com.example.template.repositories.user.TestsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestsServiceImp implements TestsService {

    public TestsRepository testsRepository;
    @Autowired
    public void setTestsRepository(TestsRepository testsRepository) {
        this.testsRepository = testsRepository;
    }

    @Override
    public List<Tests> findAll(GlobalVariables v) {
        return testsRepository.findAll(v);
    }

    @Override
    public Tests findByRef(GlobalVariables v, Long _ref) {
        Tests tests = testsRepository.findByRef(v, _ref);
        return tests;
    }
}
