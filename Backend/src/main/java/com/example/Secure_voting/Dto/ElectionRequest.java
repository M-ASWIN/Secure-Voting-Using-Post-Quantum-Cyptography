package com.example.Secure_voting.Dto;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class ElectionRequest {
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<Long> candidateIds;

}
