package com.example.Secure_voting.Service;


import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;
import com.example.Secure_voting.Repository.CandidateRepository;
import com.example.Secure_voting.Repository.VoteRepository;

import lombok.Data;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class VotingService {
    private final CandidateRepository candidateRepository;
    private final VoteRepository voteRepository;

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
}

