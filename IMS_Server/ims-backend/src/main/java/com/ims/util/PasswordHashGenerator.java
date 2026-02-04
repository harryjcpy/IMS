package com.ims.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "password123";
        String hashedPassword = encoder.encode(rawPassword);

        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Hashed Password: " + hashedPassword);
        System.out.println("\nSQL INSERT Example:");
        System.out.println("INSERT INTO users (name, email, password, role, active_status)");
        System.out.println("VALUES ('Admin User', 'admin@ims.com', '" + hashedPassword + "', 'ADMIN', true);");
    }
}
