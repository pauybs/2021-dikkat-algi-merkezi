package com.example.template.sevices;

import com.example.template.model.master.Admin;
import org.springframework.stereotype.Service;

@Service
public interface AdminService {
    public Admin loginAdmin(String _title, String _password) throws Exception;
}
