package com.ims.service;

import com.ims.entity.Accountant;
import java.util.List;

public interface AccountantService {
    Accountant saveAccountant(Accountant accountant);

    List<Accountant> getAllAccountants();

    Accountant getAccountantById(Long id);

    void deleteAccountant(Long id);
}
