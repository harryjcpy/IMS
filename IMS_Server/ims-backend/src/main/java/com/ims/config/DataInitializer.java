package com.ims.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 */
@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

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
        try {
            logger.info("🚀 Checking for default admin user...");
            if (!userRepository.existsByEmail("admin@ims.com")) {
                logger.info("📝 Creating default admin user (admin@ims.com / admin123)...");

                User adminUser = new User();
                adminUser.setName("Super Admin");
                adminUser.setEmail("admin@ims.com");
                adminUser.setPassword(passwordEncoder.encode("admin123"));
                adminUser.setRole(Role.ADMIN);
                adminUser.setIsActive(true);

                User savedUser = userRepository.save(adminUser);

                Admin adminEntity = new Admin();
                adminEntity.setMyUser(savedUser);
                adminEntity.setIsActive(true);
                adminRepository.save(adminEntity);

                logger.info("✅ Default admin user created successfully!");
            } else {
                logger.debug("ℹ️ Admin user already exists. Skipping initialization.");
            }
        } catch (Exception e) {
            logger.error("❌ ERROR during Data Initialization: {}", e.getMessage(), e);
        }
    }
}
