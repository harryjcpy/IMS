package com.ims.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
	private String token;
	private String type = "Bearer";
	private Long id;
	private String email;
	private String name;
	private String role;

	public LoginResponse(String token, Long id, String email, String name, String role) {
		this.token = token;
		this.type = "Bearer";
		this.id = id;
		this.email = email;
		this.name = name;
		this.role = role;
	}
}
