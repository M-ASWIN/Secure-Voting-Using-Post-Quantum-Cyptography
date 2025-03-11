package com.example.Secure_voting.Service;


import com.example.Secure_voting.Dto.ResultDTO;
import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;
import com.example.Secure_voting.Repository.CandidateRepository;
import com.example.Secure_voting.Repository.VoteRepository;

import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Data
public class VotingService {
    @Autowired
    private final CandidateRepository candidateRepository;
    @Autowired
    private VoteRepository voteRepository;

    public VotingService(CandidateRepository candidateRepository, VoteRepository voteRepository) {
        this.candidateRepository = candidateRepository;
        this.voteRepository = voteRepository;
    }

    public List<Candidate> getCandidates() {
        return candidateRepository.findAll();
    }

    public void castVote(User voter, Long candidateId) {
        Candidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));
        Vote vote = new Vote();
        vote.setUser(voter);
        vote.setCandidate(candidate);
        voteRepository.save(vote);
    }

  

    public List<ResultDTO> getElectionResults(Long electionId) {
        List<Object[]> results = voteRepository.getElectionResults(electionId);
    
        int totalVotes = results.stream().mapToInt(r -> ((Number) r[3]).intValue()).sum();
    
        return results.stream().map(r -> {
            Long candidateId = ((Number) r[0]).longValue();
            String candidateName = (String) r[1];
            String candidateParty = (String) r[2]; // Fetch party
            int voteCount = ((Number) r[3]).intValue();
            double percentage = (double) voteCount / totalVotes * 100;
    
            return new ResultDTO(candidateName, candidateParty, voteCount, percentage);
        }).collect(Collectors.toList());
    }    
}

