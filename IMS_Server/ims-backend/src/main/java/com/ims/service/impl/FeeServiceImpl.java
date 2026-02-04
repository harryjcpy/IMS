package com.ims.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.entity.Fee;
import com.ims.entity.Fee.FeeStatus;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.FeeRepository;
import com.ims.service.FeeService;

@Service
@Transactional
public class FeeServiceImpl implements FeeService {

    private final FeeRepository feeRepository;

    public FeeServiceImpl(FeeRepository feeRepository) {
        this.feeRepository = feeRepository;
    }

    @Override
    public List<Fee> getAllFees() {
        return feeRepository.findAll();
    }

    @Override
    public Fee getFeeById(Long id) {
        return feeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fee not found with id: " + id));
    }

    @Override
    public Fee createFee(Fee fee) {
        // Check if fee is overdue
        if (fee.getDueDate().isBefore(LocalDate.now()) && fee.getStatus() == FeeStatus.PENDING) {
            fee.setStatus(FeeStatus.OVERDUE);
        }
        return feeRepository.save(fee);
    }

    @Override
    public Fee updateFee(Long id, Fee fee) {
        Fee existingFee = getFeeById(id);
        existingFee.setAmount(fee.getAmount());
        existingFee.setDueDate(fee.getDueDate());
        existingFee.setDescription(fee.getDescription());

        // Update status if due date changed
        if (existingFee.getDueDate().isBefore(LocalDate.now()) && existingFee.getStatus() == FeeStatus.PENDING) {
            existingFee.setStatus(FeeStatus.OVERDUE);
        }

        return feeRepository.save(existingFee);
    }

    @Override
    public void deleteFee(Long id) {
        if (!feeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Fee not found with id: " + id);
        }
        feeRepository.deleteById(id);
    }

    @Override
    public Fee recordPayment(Long id, LocalDate paymentDate) {
        Fee fee = getFeeById(id);
        fee.setStatus(FeeStatus.PAID);
        fee.setPaymentDate(paymentDate);
        return feeRepository.save(fee);
    }

    @Override
    public List<Fee> getFeesByStudent(Long studentId) {
        return feeRepository.findByStudentId(studentId);
    }

    @Override
    public List<Fee> getFeesByStatus(FeeStatus status) {
        return feeRepository.findByStatus(status);
    }
}
