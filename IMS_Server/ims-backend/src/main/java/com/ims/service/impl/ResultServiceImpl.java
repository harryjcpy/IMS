package com.ims.service.impl;

import com.ims.entity.Result;
import com.ims.repository.ResultRepository;
import com.ims.service.ResultService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ResultServiceImpl implements ResultService {

    private final ResultRepository resultRepo;

    public ResultServiceImpl(ResultRepository resultRepo) {
        this.resultRepo = resultRepo;
    }

    @Override
    public Result saveResult(Result result) {
        return resultRepo.save(result);
    }

    @Override
    public List<Result> getAllResults() {
        return resultRepo.findAll();
    }

    @Override
    public Result getResultById(Long id) {
        return resultRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found with id: " + id));
    }

    @Override
    public void deleteResult(Long id) {
        resultRepo.deleteById(id);
    }
}
