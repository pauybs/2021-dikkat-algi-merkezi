package com.example.template.repositories;

import com.example.template.model.db.master.Auth;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends CrudRepository<Auth, Long> {
    Auth findByName(String name);
    Auth findByCode(String code);
}
