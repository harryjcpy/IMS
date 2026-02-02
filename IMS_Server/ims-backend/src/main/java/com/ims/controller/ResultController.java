package com.ims.controller;

import com.ims.entity.Result;
import com.ims.service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @PostMapping
    public Result createResult(@RequestBody Result result) {
        return resultService.saveResult(result);
    }

    @GetMapping
    public List<Result> getAllResults() {
        return resultService.getAllResults();
    }

    @GetMapping("/{id}")
    public Result getResultById(@PathVariable Long id) {
        return resultService.getResultById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteResult(@PathVariable Long id) {
        resultService.deleteResult(id);
    }
}
