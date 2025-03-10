package com.example.Secure_voting.Service;

import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;
import com.example.Secure_voting.Repository.ElectionRepository;
import com.example.Secure_voting.Repository.UserRepository;
import com.example.Secure_voting.Repository.VoteRepository;
import com.example.Secure_voting.Repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ElectionService {
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VoteRepository voteRepository;

    // public Election createElection(Election election, Set<Long> candidateIds) {
    //     Set<Candidate> candidates = candidateRepository.findAllById(candidateIds).stream().collect(java.util.stream.Collectors.toSet());
    //     election.setCandidates(candidates);
    //     return electionRepository.save(election);
    // }

    public boolean deleteElectionById(Long id) {
        if (electionRepository.existsById(id)) {
            electionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Election> getAllElections() {
        return electionRepository.findAll();
    }

    public Optional<Election> getElectionById(Long id) {
        return electionRepository.findById(id);
    }

    public List<Election> getElectionsForUser(Long userId) {
        return electionRepository.findAvailableElections(userId);
    }

    public boolean deleteCandidateById(Long id) {
        if (candidateRepository.existsById(id)) {
            candidateRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Transactional
    public void castVote(Long userId, Long electionId, Long candidateId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Election election = electionRepository.findById(electionId).orElseThrow(() -> new RuntimeException("Election not found"));
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow(() -> new RuntimeException("Candidate not found"));

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setElection(election);
        vote.setCandidate(candidate);

        voteRepository.save(vote);
    }
}
