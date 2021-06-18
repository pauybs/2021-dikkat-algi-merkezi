package com.example.template.repositories.master;

import com.example.template.model.master.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Long> {


    Auth findByTitle(String title);
    Auth findByTitleAndPasswordAndCode(String title, String password, String code);
    Auth findByCode(String _code);
  /*   @Query("select code from Auth where code=:code")
    String findBySecurityID(@Param("code") String code);
   @Query("SELECT DISTINCT name as name FROM SubTest where tests_ref=:tests_ref")
    List<Map<String, String>> findDistinctByName(@Param("tests_ref") Long tests_ref);*/


}
