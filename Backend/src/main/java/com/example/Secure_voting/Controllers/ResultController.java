package com.example.Secure_voting.Controllers;

import com.example.Secure_voting.Service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {
    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    @GetMapping
    public List<Object[]> getResults() {
        return resultService.getResults();
    }
}

