package com.ims.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByRollNo(String rollNo);
}
