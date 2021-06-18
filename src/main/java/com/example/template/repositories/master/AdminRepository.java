package com.example.template.repositories.master;

import com.example.template.model.master.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByTitleAndPassword(String _title, String _password);
}
