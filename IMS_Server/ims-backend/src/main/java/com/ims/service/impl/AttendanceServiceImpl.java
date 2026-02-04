package com.ims.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.entity.Attendance;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.AttendanceRepository;
import com.ims.service.AttendanceService;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {
    private final AttendanceRepository attendanceRepo;

    public AttendanceServiceImpl(AttendanceRepository attendanceRepo) {
        this.attendanceRepo = attendanceRepo;
    }

    @Override
    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepo.save(attendance);
    }

    @Override
    public List<Attendance> getAllAttendance() {
        return attendanceRepo.findAll();
    }

    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Attendance not found with id: " + id));
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepo.deleteById(id);
    }

}
