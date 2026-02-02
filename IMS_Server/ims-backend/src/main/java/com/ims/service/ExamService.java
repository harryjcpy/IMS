package com.ims.service;

import com.ims.entity.Exam;
import java.util.List;

public interface ExamService {
    Exam saveExam(Exam exam);

    List<Exam> getAllExams();

    Exam getExamById(Long id);

    void deleteExam(Long id);
}
