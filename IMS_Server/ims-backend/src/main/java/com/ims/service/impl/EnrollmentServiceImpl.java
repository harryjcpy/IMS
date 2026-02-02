package com.ims.service.impl;

import com.ims.entity.Enrollment;
import com.ims.repository.EnrollmentRepository;
import com.ims.service.EnrollmentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EnrollmentServiceImpl implements EnrollmentService {

    private final EnrollmentRepository enrollmentRepo;

    public EnrollmentServiceImpl(EnrollmentRepository enrollmentRepo) {
        this.enrollmentRepo = enrollmentRepo;
    }

    @Override
    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepo.save(enrollment);
    }

    @Override
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepo.findAll();
    }

    @Override
    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found with id: " + id));
    }

    @Override
    public void deleteEnrollment(Long id) {
        enrollmentRepo.deleteById(id);
    }
}
