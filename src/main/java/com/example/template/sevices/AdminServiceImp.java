package com.example.template.sevices;

import com.example.template.model.master.Admin;
import com.example.template.repositories.master.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImp implements AdminService {
    @Autowired
    AdminRepository adminRepository;
    @Override
    public Admin loginAdmin(String _title, String _password) throws Exception{
        return adminRepository.findByTitleAndPassword(_title, _password);

    }
}
