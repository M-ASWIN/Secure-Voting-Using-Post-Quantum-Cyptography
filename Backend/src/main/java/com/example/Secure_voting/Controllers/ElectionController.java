package com.example.Secure_voting.Controllers;

import com.example.Secure_voting.Dto.ElectionRequest;
import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Repository.CandidateRepository;
import com.example.Secure_voting.Repository.ElectionRepository;
import com.example.Secure_voting.Repository.VoteRepository;
import com.example.Secure_voting.Service.ElectionService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/elections")
public class ElectionController {

    @Autowired
    private ElectionService electionService;

    @Autowired
    private ElectionRepository electionRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VoteRepository voteRepository;
    
    @PostMapping
    public ResponseEntity<String> createElection(@RequestBody ElectionRequest request) {
        if (request.getCandidateIds() == null || request.getCandidateIds().isEmpty()) {
            return ResponseEntity.badRequest().body("candidateIds is required");
        }

        // Fetch candidates from database
        List<Candidate> candidates = candidateRepository.findAllById(request.getCandidateIds());

        if (candidates.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid candidate IDs provided.");
        }

        // Create and save the election
        Election election = new Election(request.getName(), request.getStartDate(), request.getEndDate(), candidates);
        electionRepository.save(election);

        return ResponseEntity.ok("Election '" + request.getName() + "' created successfully!");
    }


    @GetMapping
    public List<Election> getAllElections() {
        return electionService.getAllElections();
    }

    @GetMapping("/{id}")
    public Optional<Election> getElectionById(@PathVariable Long id) {
        return electionService.getElectionById(id);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<String> deleteElection(@PathVariable Long id) {
        // Step 1: Delete votes linked to this election
        voteRepository.deleteByElectionId(id);
        boolean isDeleted = electionService.deleteElectionById(id);
        if (isDeleted) {
            return ResponseEntity.ok("Election deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Election not found.");
        }
    }
}
