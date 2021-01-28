package com.example.template.repositories;

import com.example.template.model.db.master.TestStudent;
import com.example.template.model.db.master.Tests;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Repository
public interface TestStudentRepository extends CrudRepository<TestStudent, Long> {
  //  public List<TestStudent> findByTestsRefAndStudentsRefAndResult(Long tests_ref, Long students_ref,String result);
  /*
  EntityManager em = emf.createEntityManager();
    @Query("select new com.example.template.model.db.TestStudentObject(ts.ref, ts.students.ref, ts.tests.ref, ts.test_date, ts.result) FROM TestStudent ts, Students s , Tests t WHERE ts.students.ref = s.ref AND ts.tests.ref = t.ref")
    List<TestStudentObject> fetchDataCrossJoin();*/
    Optional<TestStudent> findByTestsRefAndStudentsRefAndRef(Long tests_ref,Long students_ref, Long ref);
    List<TestStudent> findByTestsRefAndStudentsRef(Long tests_ref, Long students_ref);


   Optional<TestStudent> findByStudentsRef(Long students_ref);
     Optional<TestStudent> findByTestsRef(Long tests_ref);


}
