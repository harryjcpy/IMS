package com.ims.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ims.entity.Fee;
import com.ims.entity.Fee.FeeStatus;
import com.ims.service.FeeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/fees")
public class FeeController {

    private final FeeService feeService;

    public FeeController(FeeService feeService) {
        this.feeService = feeService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @GetMapping
    public List<Fee> getAllFees() {
        System.out.println("=== GET ALL FEES ===");
        try {
            List<Fee> fees = feeService.getAllFees();
            System.out.println("Successfully fetched " + fees.size() + " fees");
            return fees;
        } catch (Exception e) {
            System.err.println("ERROR in getAllFees: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @GetMapping("/{id}")
    public Fee getFeeById(@PathVariable Long id) {
        return feeService.getFeeById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @GetMapping("/student/{studentId}")
    public List<Fee> getFeesByStudent(@PathVariable Long studentId) {
        return feeService.getFeesByStudent(studentId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @GetMapping("/status/{status}")
    public List<Fee> getFeesByStatus(@PathVariable FeeStatus status) {
        return feeService.getFeesByStatus(status);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @PostMapping
    public Fee createFee(@RequestBody Fee fee) {
        return feeService.createFee(fee);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @PutMapping("/{id}")
    public Fee updateFee(@PathVariable Long id, @RequestBody Fee fee) {
        return feeService.updateFee(id, fee);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'ACCOUNTANT')")
    @PostMapping("/{id}/payment")
    public Fee recordPayment(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        LocalDate paymentDate = LocalDate.parse(payload.get("paymentDate"));
        return feeService.recordPayment(id, paymentDate);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteFee(@PathVariable Long id) {
        feeService.deleteFee(id);
        return "Fee deleted successfully";
    }
}
