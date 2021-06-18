package com.example.template.sevices;

import com.example.template.GlobalVariables;
import com.example.template.model.user.SubTestResult;
import com.example.template.repositories.user.SubTestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTestResultServiceImp implements SubTestResultService {
    @Autowired
    SubTestResultRepository subTestResultRepository;


    @Override
    public List<SubTestResult> findAll(GlobalVariables v) {
        return (List<SubTestResult>) subTestResultRepository.findAll(v);
    }

    @Override
    public List<SubTestResult> findBySubTestRefAndRef(GlobalVariables v,Long sub_test_ref, Long ref) {
        return subTestResultRepository.findBySubTestRefAndRef(v, sub_test_ref, ref);
    }

    @Override
    public SubTestResult findByRef(GlobalVariables v,Long _ref) {
        return subTestResultRepository.findByRef(v, _ref);
    }

    @Override
    public void deleteSubTest(GlobalVariables v,SubTestResult _subTestResult) {
        subTestResultRepository.deleteSubTestResult(v, _subTestResult);
    }

    @Override
    public SubTestResult saveSubTestResult(GlobalVariables v, SubTestResult _subTestResult) {
        return subTestResultRepository.saveSubTestResult(v, _subTestResult);
    }

    @Override
    public List<SubTestResult> findBySubTestRef(GlobalVariables v, Long sub_test_ref) {
        return subTestResultRepository.findBySubTestRef(v, sub_test_ref);
    }


}
