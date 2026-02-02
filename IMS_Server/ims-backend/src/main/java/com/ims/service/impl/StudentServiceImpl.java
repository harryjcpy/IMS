package com.ims.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.entity.Student;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.StudentRepository;
import com.ims.service.StudentService;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {
	private final StudentRepository studentRepo;

	public StudentServiceImpl(StudentRepository studentRepo) {
		this.studentRepo = studentRepo;
	}

	@Override
	public Student saveStudent(Student student) {
		return studentRepo.save(student);
	}

	@Override
	public List<Student> getAllStudents() {
		return studentRepo.findAll();
	}

	@Override
	public Student getStudentById(Long id) {
		return studentRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
	}

	@Override
	public void deleteStudent(Long id) {
		studentRepo.deleteById(id);
	}

}
