package com.example.template.repositories.user;


import com.example.template.GlobalVariables;
import com.example.template.model.user.TestStudent;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestStudentRepository  {
  //  public List<TestStudent> findByTestsRefAndStudentsRefAndResult(Long tests_ref, Long students_ref,String result);

 // EntityManager em = emf.createEntityManager();
  //  @Query("select new com.example.template.model.db.TestStudentObject(ts.ref, ts.students.ref, ts.tests.ref, ts.test_date, ts.result) FROM TestStudent ts, Students s , Tests t WHERE ts.students.ref = s.ref AND ts.tests.ref = t.ref")
  //  List<TestStudentObject> fetchDataCrossJoin();
    TestStudent findByTestsRefAndStudentsRefAndRef(GlobalVariables v, Long tests_ref, Long students_ref, Long ref);
    List<TestStudent> findByTestsRefAndStudentsRef(GlobalVariables v, Long tests_ref, Long students_ref);


  List<TestStudent> findByStudentsRef(GlobalVariables v, Long students_ref);
  List<TestStudent> findByTestsRef(GlobalVariables v, Long tests_ref);
     TestStudent findByRef(GlobalVariables v, Long _ref);

    List<TestStudent> findAll(GlobalVariables v);
    TestStudent saveTestStudent(GlobalVariables v, TestStudent testStudent);
    TestStudent deleteTestStudent(GlobalVariables v, TestStudent testStudent);

}