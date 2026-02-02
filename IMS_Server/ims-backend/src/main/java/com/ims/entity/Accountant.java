package com.ims.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
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
@Table(name = "accountants")
@AttributeOverride(name = "id", column = @Column(name = "accountant_id"))
public class Accountant extends BaseEntity {
	@OneToOne
	@JoinColumn(name = "user_id")
	private User myUser;
}
