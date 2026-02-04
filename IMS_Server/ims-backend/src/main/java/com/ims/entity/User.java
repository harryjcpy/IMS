package com.ims.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
public class User extends BaseEntity {
	@Column(nullable = false, length = 50)
	private String name;
	@Column(nullable = false, unique = true, length = 50)
	private String email;
	@Column(nullable = false, length = 255)
	private String password;
	@Enumerated(EnumType.STRING)
	private Role role;
}
