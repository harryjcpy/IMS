package com.ims.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ims.entity.Fee;
import com.ims.entity.Fee.FeeStatus;
import com.ims.entity.Student;

@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByStudent(Student student);

    List<Fee> findByStatus(FeeStatus status);

    List<Fee> findByDueDateBetween(LocalDate startDate, LocalDate endDate);

    List<Fee> findByStudentId(Long studentId);
}
