// package com.example.Secure_voting.Controllers;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import com.example.Secure_voting.Entity.Election;
// import com.example.Secure_voting.Service.ElectionService;

// import java.util.List;

// @RestController
// @RequestMapping("/api/elections")
// public class ElectionController {

//     @Autowired
//     private ElectionService electionService;

//     @PostMapping("/create")
//     public Election createElection(@RequestBody Election election) {
//         return electionService.createElection(election);
//     }

//     @GetMapping("/ongoing")
//     public List<Election> getOngoingElections() {
//         return electionService.getOngoingElections();
//     }

//     // @GetMapping("/{id}")
//     // public Election getElectionWithCandidates(@PathVariable Long id) {
//     //     return electionService.getElectionWithCandidates(id);
//     // }
// }

