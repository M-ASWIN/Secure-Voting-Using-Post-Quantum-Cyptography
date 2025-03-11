package com.example.Secure_voting.Controllers;


import com.example.Secure_voting.Dto.ResultDTO;
import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Service.VotingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vote")
public class VotingController {
    private final VotingService votingService;

    public VotingController(VotingService votingService) {
        this.votingService = votingService;
    }

    @GetMapping("/candidates")
    public List<Candidate> getCandidates() {
        return votingService.getCandidates();
    }

    @PostMapping("/cast/{candidateId}")
    public String castVote(@RequestBody User voter, @PathVariable Long candidateId) {
        votingService.castVote(voter, candidateId);
        return "Vote cast successfully!";
    }

     @GetMapping("/results/{electionId}")
    public List<ResultDTO> getResults(@PathVariable Long electionId) {
        return votingService.getElectionResults(electionId);
    }
}
