package com.ims.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ims.dto.RegisterRequest;
import com.ims.entity.User;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.UserRepository;
import com.ims.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	private final UserRepository userRepo;

	public UserServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	public User registerUser(RegisterRequest request) {
		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(request.getPassword());
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
			user.setPassword(request.getPassword());
		}
		user.setRole(request.getRole());
		return userRepo.save(user);
	}

}
