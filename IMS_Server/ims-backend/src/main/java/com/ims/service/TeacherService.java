package com.ims.service;

import com.ims.entity.Teacher;
import java.util.List;

public interface TeacherService {
    Teacher saveTeacher(Teacher teacher);

    List<Teacher> getAllTeachers();

    Teacher getTeacherById(Long id);

    void deleteTeacher(Long id);
}
