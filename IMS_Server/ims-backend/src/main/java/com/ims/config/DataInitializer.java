package com.ims.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ims.entity.Admin;
import com.ims.entity.Role;
import com.ims.entity.User;
import com.ims.repository.AdminRepository;
import com.ims.repository.UserRepository;

/**
 * Initializes the database with a default admin user on first startup.
 * This solves the "bootstrap problem" - creating the first admin who can then
 * create other users.
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if admin already exists
        if (!userRepository.existsByEmail("admin@ims.com")) {
            // Create default admin user
            User adminUser = new User();
            adminUser.setName("Super Admin");
            adminUser.setEmail("admin@ims.com");
            adminUser.setPassword(passwordEncoder.encode("admin123")); 
            adminUser.setRole(Role.ADMIN);

            User savedUser = userRepository.save(adminUser);

            // Create admin entity
            Admin admin = new Admin();
            admin.setMyUser(savedUser);
            adminRepository.save(admin);

            System.out.println("========================================");
            System.out.println("✅ Default admin user created!");
            System.out.println("📧 Email: admin@ims.com");
            System.out.println("🔑 Password: admin123");
            System.out.println("⚠️  Please change password after first login!");
            System.out.println("========================================");
        }
    }
}
