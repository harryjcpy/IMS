package com.ims.entity;

import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
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
@Table(name = "enrollments")
@AttributeOverride(name = "id", column = @Column(name = "enrollment_id"))
public class Enrollment extends BaseEntity {
	@ManyToOne
	@JoinColumn(name = "student_id", nullable = false)
	private Student myStudent;
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course myCourse;
	@Column(name = "enrollment_date", nullable = false)
	private LocalDate enrollDate;
}
