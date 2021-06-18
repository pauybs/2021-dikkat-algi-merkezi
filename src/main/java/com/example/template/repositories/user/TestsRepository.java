package com.example.template.repositories.user;


import com.example.template.GlobalVariables;
import com.example.template.model.user.Tests;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestsRepository   {
    Tests findByRef(GlobalVariables v, Long _ref);
    List<Tests> findAll(GlobalVariables v);
}
