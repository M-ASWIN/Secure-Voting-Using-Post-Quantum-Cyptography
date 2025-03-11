package com.example.Secure_voting.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;
import com.example.Secure_voting.Repository.CandidateRepository;
import com.example.Secure_voting.Repository.ElectionRepository;
import com.example.Secure_voting.Repository.UserRepository;
import com.example.Secure_voting.Repository.VoteRepository;
import com.example.Secure_voting.Service.ElectionService;

@RestController
@RequestMapping("/api/user-elections")
public class UserElectionController {

    @Autowired
    private ElectionRepository electionRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private ElectionService electionService;
    // Get elections the user hasn't voted in
    // @GetMapping("/available")
    // public List<Election> getAvailableElections(@RequestParam Long userId) {
    //     User user = userRepository.findById(userId).orElseThrow();
    //     return electionRepository.findAll().stream()
    //             .filter(election -> !voteRepository.existsByUserAndElection(user, election))
    //             .collect(Collectors.toList());
    // }

     @GetMapping("/available/{userId}")
    public ResponseEntity<List<Election>> getAvailableElections(@PathVariable Long userId) {
        List<Election> elections = electionService.getElectionsForUser(userId);
        return ResponseEntity.ok(elections);
    }

    // Vote for a candidate
    @PostMapping("/vote")
    public ResponseEntity<?> vote(@RequestParam Long userId, @RequestParam Long electionId, @RequestParam Long candidateId) {
        User user = userRepository.findById(userId).orElseThrow();
        Election election = electionRepository.findById(electionId).orElseThrow();
        Candidate candidate = candidateRepository.findById(candidateId).orElseThrow();

        // Check if user has already voted
        if (voteRepository.existsByUserAndElection(user, election)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User has already voted in this election.");
        }

        Vote vote = new Vote();
        vote.setUser(user);
        vote.setElection(election);
        vote.setCandidate(candidate);
        voteRepository.save(vote);

        return ResponseEntity.ok("Vote submitted successfully!");
    }
}
