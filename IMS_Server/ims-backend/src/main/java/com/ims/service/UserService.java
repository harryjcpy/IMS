package com.ims.service;

import com.ims.dto.ChangePasswordRequest;
import com.ims.dto.RegisterRequest;
import com.ims.entity.User;

import java.util.List;

public interface UserService {
	User registerUser(RegisterRequest request);

	User findByEmail(String email);

	List<User> getAllUsers();

	User getUserById(Long id);

	void deleteUser(Long id);

	User updateUser(Long id, RegisterRequest request);

	void changePassword(Long userId, ChangePasswordRequest request);
}
