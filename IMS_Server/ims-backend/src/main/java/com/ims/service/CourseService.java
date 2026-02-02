package com.ims.service;

import com.ims.entity.Course;
import java.util.List;

public interface CourseService {
    Course saveCourse(Course course);

    List<Course> getAllCourses();

    Course getCourseById(Long id);

    void deleteCourse(Long id);
}
