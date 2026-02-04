package com.ims.service;

import java.time.LocalDate;
import java.util.List;

import com.ims.entity.Fee;
import com.ims.entity.Fee.FeeStatus;

public interface FeeService {
    List<Fee> getAllFees();

    Fee getFeeById(Long id);

    Fee createFee(Fee fee);

    Fee updateFee(Long id, Fee fee);

    void deleteFee(Long id);

    Fee recordPayment(Long id, LocalDate paymentDate);

    List<Fee> getFeesByStudent(Long studentId);

    List<Fee> getFeesByStatus(FeeStatus status);
}
