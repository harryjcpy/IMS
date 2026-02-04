package com.ims.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.dto.ChangePasswordRequest;
import com.ims.dto.RegisterRequest;
import com.ims.entity.User;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.UserRepository;
import com.ims.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;
	private final PasswordEncoder passwordEncoder;

	public UserServiceImpl(UserRepository userRepo, PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User registerUser(RegisterRequest request) {
		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash password
		user.setRole(request.getRole());
		return userRepo.save(user);
	}

	@Override
	public User findByEmail(String email) {
		return userRepo.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
	}

	@Override
	public List<User> getAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public User getUserById(Long id) {
		return userRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
	}

	@Override
	public void deleteUser(Long id) {
		if (!userRepo.existsById(id)) {
			throw new ResourceNotFoundException("User not found with id: " + id);
		}
		userRepo.deleteById(id);
	}

	@Override
	public User updateUser(Long id, RegisterRequest request) {
		User user = getUserById(id);
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		if (request.getPassword() != null && !request.getPassword().isEmpty()) {
			user.setPassword(passwordEncoder.encode(request.getPassword())); // Hash password
		}
		user.setRole(request.getRole());
		return userRepo.save(user);
	}

	@Override
	public void changePassword(Long userId, ChangePasswordRequest request) {
		User user = getUserById(userId);

		// Validate old password
		if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
			throw new IllegalArgumentException("Old password is incorrect");
		}

		// Set new password
		user.setPassword(passwordEncoder.encode(request.getNewPassword()));
		userRepo.save(user);
	}

}
