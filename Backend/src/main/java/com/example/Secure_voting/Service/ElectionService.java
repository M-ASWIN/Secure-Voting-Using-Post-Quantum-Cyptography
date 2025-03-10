package com.example.Secure_voting.Service;

import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Repository.ElectionRepository;
import com.example.Secure_voting.Repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ElectionService {
    
    @Autowired
    private ElectionRepository electionRepository;
    
    @Autowired
    private CandidateRepository candidateRepository;

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

    public boolean deleteCandidateById(Long id) {
        if (candidateRepository.existsById(id)) {
            candidateRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
}
