package com.ims.service.impl;

import com.ims.entity.Accountant;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.AccountantRepository;
import com.ims.service.AccountantService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AccountantServiceImpl implements AccountantService {

    private final AccountantRepository accountantRepo;

    public AccountantServiceImpl(AccountantRepository accountantRepo) {
        this.accountantRepo = accountantRepo;
    }

    @Override
    public Accountant saveAccountant(Accountant accountant) {
        return accountantRepo.save(accountant);
    }

    @Override
    public List<Accountant> getAllAccountants() {
        return accountantRepo.findAll();
    }

    @Override
    public Accountant getAccountantById(Long id) {
        return accountantRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Accountant not found with id: " + id));
    }

    @Override
    public void deleteAccountant(Long id) {
        accountantRepo.deleteById(id);
    }
}
