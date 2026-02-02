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
@Table(name = "results")
@AttributeOverride(name = "id", column = @Column(name = "result_id"))
public class Result extends BaseEntity{
	@ManyToOne
	@JoinColumn(name = "exam_id")
	private Exam myExam;
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student myStudent;
	private double marks;
	private String grade;
}
