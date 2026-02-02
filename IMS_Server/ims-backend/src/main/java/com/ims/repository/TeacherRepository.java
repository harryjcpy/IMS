package com.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {

}
