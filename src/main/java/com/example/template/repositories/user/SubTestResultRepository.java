package com.example.template.repositories.user;


import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTestResult;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubTestResultRepository  {
    List<SubTestResult> findBySubTestRef(GlobalVariables v, Long sub_test_ref);
    List<SubTestResult> findBySubTestRefAndRef(GlobalVariables v, Long sub_test_ref, Long ref);
    SubTestResult findByRef(GlobalVariables v, Long _ref);
    List<SubTestResult> findAll(GlobalVariables v);
    SubTestResult saveSubTestResult(GlobalVariables v, SubTestResult subTestResult);
    SubTestResult deleteSubTestResult(GlobalVariables v, SubTestResult subTestResult);
}
