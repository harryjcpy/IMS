package com.ims.service;

import com.ims.entity.Result;
import java.util.List;

public interface ResultService {
    Result saveResult(Result result);

    List<Result> getAllResults();

    Result getResultById(Long id);

    void deleteResult(Long id);
}
