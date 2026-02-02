package com.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

}
