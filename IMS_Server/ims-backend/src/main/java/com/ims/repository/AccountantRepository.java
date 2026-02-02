package com.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Accountant;

public interface AccountantRepository extends JpaRepository<Accountant, Long> {

}
