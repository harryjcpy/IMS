package com.ims.service;

import com.ims.entity.Enrollment;
import java.util.List;

public interface EnrollmentService {
    Enrollment saveEnrollment(Enrollment enrollment);

    List<Enrollment> getAllEnrollments();

    Enrollment getEnrollmentById(Long id);

    void deleteEnrollment(Long id);
}
