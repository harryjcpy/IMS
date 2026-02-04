package com.ims.entity;

import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "students")
@AttributeOverride(name = "id", column = @Column(name = "student_id"))
public class Student extends BaseEntity {
	@OneToOne(fetch = jakarta.persistence.FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	private User myUser;

	@Column(name = "roll_no", unique = true, length = 50)
	private String rollNo;
	@Column(name = "admission_date")
	private LocalDate admissionDate;

	public User getMyUser() {
		return myUser;
	}

	public void setMyUser(User myUser) {
		this.myUser = myUser;
	}
}
