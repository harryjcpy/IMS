package com.ims.controller;

import com.ims.entity.Accountant;
import com.ims.service.AccountantService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accountants")
public class AccountantController {

    private final AccountantService accountantService;

    public AccountantController(AccountantService accountantService) {
        this.accountantService = accountantService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Accountant createAccountant(@RequestBody Accountant accountant) {
        return accountantService.saveAccountant(accountant);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<Accountant> getAllAccountants() {
        return accountantService.getAllAccountants();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public Accountant getAccountantById(@PathVariable Long id) {
        return accountantService.getAccountantById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Accountant updateAccountant(@PathVariable Long id, @RequestBody Accountant accountant) {
        return accountantService.saveAccountant(accountant);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteAccountant(@PathVariable Long id) {
        accountantService.deleteAccountant(id);
    }
}
