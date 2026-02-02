package com.ims.entity;

import java.time.LocalDate;

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
@Table(name = "exams")
@AttributeOverride(name = "id", column = @Column(name = "exam_id"))
public class Exam extends BaseEntity{
	@ManyToOne
	@JoinColumn(name = "course_id")
	private Course myCourse;
	@Column(name = "exam_date")
	private LocalDate examDate;
	@Column(name = "exam_type", length = 40)
	private String examType;
}
