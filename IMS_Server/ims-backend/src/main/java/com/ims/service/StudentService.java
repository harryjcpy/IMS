package com.ims.service;

import java.util.List;

import com.ims.entity.Student;


public interface StudentService{
	Student saveStudent(Student student);
	List<Student> getAllStudents();
	Student getStudentById(Long id);
	void deleteStudent(Long id);
}
