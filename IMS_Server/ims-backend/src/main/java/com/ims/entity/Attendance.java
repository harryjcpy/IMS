package com.ims.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "attendance")
@AttributeOverride(name = "id", column = @Column(name = "attendance_id"))
public class Attendance extends BaseEntity {
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student myStudent;

	@JoinColumn(name = "course_id")
	private Course myCourse;

	private String status;

	@ManyToOne
	@JoinColumn(name = "teacher_id")
	private Teacher markedBy;
}
