package com.example.Secure_voting.Service;

import com.example.Secure_voting.Entity.Vote;
import com.example.Secure_voting.Repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultService {
    private final VoteRepository voteRepository;

    public List<Object[]> getResults() {
        return voteRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        Vote::getCandidate, // Group by Candidate
                        Collectors.counting() // Count votes per Candidate
                ))
                .entrySet()
                .stream()
                .map(entry -> new Object[]{
                        entry.getKey().getName(), // Candidate's name
                        entry.getValue() // Vote count
                })
                .collect(Collectors.toList());
    }
}