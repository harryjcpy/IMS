package com.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {

}
