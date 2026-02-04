package com.ims.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ims.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Spring Data JPA provides all CRUD methods automatically
    // No need to write any code!
}
