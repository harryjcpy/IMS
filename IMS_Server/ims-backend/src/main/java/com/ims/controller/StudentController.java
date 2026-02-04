package com.ims.controller;

import com.ims.entity.Student;
import com.ims.service.StudentService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT', 'TEACHER')")
    @GetMapping
    public List<Student> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        System.out.println("=== GET ALL STUDENTS ===");
        System.out.println("Total students: " + students.size());
        for (Student s : students) {
            System.out.println("Student ID: " + s.getId());
            System.out.println("Roll No: " + s.getRollNo());
            System.out.println("User: " + (s.getMyUser() != null ? s.getMyUser().getName() : "NULL"));
            System.out.println("User Email: " + (s.getMyUser() != null ? s.getMyUser().getEmail() : "NULL"));
        }
        return students;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }
}
