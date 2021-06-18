package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.Tests;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface TestsService {

    List<Tests> findAll(GlobalVariables v);
    public Tests findByRef(GlobalVariables v, Long ref);
}
