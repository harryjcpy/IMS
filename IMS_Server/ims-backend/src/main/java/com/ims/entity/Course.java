package com.ims.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "courses")
@AttributeOverride(name = "id", column = @Column(name = "course_id"))
public class Course extends BaseEntity {
	@Column(name = "course_name", length = 40, nullable = false)
	private String courseName;
	@Column(name = "duration_in_months")
	private int durationInMonths;
	private double fee;
}
