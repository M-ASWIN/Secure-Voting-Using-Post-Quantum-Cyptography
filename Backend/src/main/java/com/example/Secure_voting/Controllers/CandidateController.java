package com.example.Secure_voting.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Repository.CandidateRepository;
import com.example.Secure_voting.Service.ElectionService;

import java.util.List;

@RestController
@RequestMapping("/admin/candidates")
@CrossOrigin(origins = "http://localhost:3000") // Adjust for your frontend
public class CandidateController {

    @Autowired
    private ElectionService electionService;
    
    @Autowired
    private CandidateRepository candidateRepository;

    // Get all candidates
    @GetMapping
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }

    // Create a new candidate
    @PostMapping
    public Candidate createCandidate(@RequestBody Candidate candidate) {
        return candidateRepository.save(candidate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable Long id) {
        boolean isDeleted = electionService.deleteCandidateById(id);
        if (isDeleted) {
            return ResponseEntity.ok("Candidate deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Candidate not found.");
        }
    }

}
