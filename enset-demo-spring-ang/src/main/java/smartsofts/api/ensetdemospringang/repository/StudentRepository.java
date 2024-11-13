package smartsofts.api.ensetdemospringang.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import smartsofts.api.ensetdemospringang.entities.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
	
	Student findByCode(String code);
	
	List<Student> findByProgramId(String programId);

}
