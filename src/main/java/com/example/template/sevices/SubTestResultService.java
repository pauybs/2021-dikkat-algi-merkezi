package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTestResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SubTestResultService {
    List<SubTestResult> findAll(GlobalVariables v);
    List<SubTestResult> findBySubTestRefAndRef(GlobalVariables v, Long sub_test_ref, Long ref);
    SubTestResult findByRef(GlobalVariables v, Long _ref);
    void deleteSubTest(GlobalVariables v, SubTestResult _subTestResult);
    SubTestResult saveSubTestResult(GlobalVariables v, SubTestResult _subTestResult);
    List<SubTestResult> findBySubTestRef(GlobalVariables v, Long sub_test_ref);
}
