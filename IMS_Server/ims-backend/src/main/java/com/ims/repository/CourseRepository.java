package com.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}
