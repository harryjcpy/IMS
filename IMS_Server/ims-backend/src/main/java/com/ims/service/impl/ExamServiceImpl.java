package com.ims.service.impl;

import com.ims.entity.Exam;
import com.ims.exception.ResourceNotFoundException;
import com.ims.repository.ExamRepository;
import com.ims.service.ExamService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepo;

    public ExamServiceImpl(ExamRepository examRepo) {
        this.examRepo = examRepo;
    }

    @Override
    public Exam saveExam(Exam exam) {
        return examRepo.save(exam);
    }

    @Override
    public List<Exam> getAllExams() {
        return examRepo.findAll();
    }

    @Override
    public Exam getExamById(Long id) {
        return examRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found with id: " + id));
    }

    @Override
    public void deleteExam(Long id) {
        examRepo.deleteById(id);
    }
}
