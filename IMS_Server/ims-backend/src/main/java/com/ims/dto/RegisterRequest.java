package com.ims.dto;

import com.ims.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRequest {
	private String name;
	private String email;
	private String password;
	private Role role;
}
