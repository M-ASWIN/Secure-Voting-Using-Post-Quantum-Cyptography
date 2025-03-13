package com.example.Secure_voting.Controllers;

import java.security.Signature;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Secure_voting.Dto.MyObject;
import com.example.Secure_voting.Entity.Candidate;
import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;
import com.example.Secure_voting.Repository.CandidateRepository;
import com.example.Secure_voting.Repository.ElectionRepository;
import com.example.Secure_voting.Repository.UserRepository;
import com.example.Secure_voting.Repository.VoteRepository;
import com.example.Secure_voting.Service.ElectionService;
import com.example.Secure_voting.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user-elections")
public class UserElectionController {
 
    @Autowired
    private UserService userService;
    
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
  
    @GetMapping("/available/{userId}")
    public ResponseEntity<List<Election>> getAvailableElections(@PathVariable Long userId ) {
        List<Election> elections = electionService.getElectionsForUser(userId);
        return ResponseEntity.ok(elections);
    }

    // Vote for a candidate
    @PostMapping("/vote")
    public ResponseEntity<?> vote(@RequestBody Map<String, String> payload , HttpServletRequest request) {

        String email = payload.get("email");
        User user1 = userService.findByEmail(email);
        byte[] signature = user1.getSignature();
        byte[] mldsaPublickey= user1.getMldsaPublicKey();
        byte[] sharedSecret = user1.getSharedSecret();
        String encryptedPayload = payload.get("encryptedPayload");

        try {
            
            try{
                Signature mlDsa = Signature.getInstance("MLDSA"); 
                mlDsa.initVerify(userService.convertToPublicKey(mldsaPublickey,"MLDSA"));
                System.out.println("success");
                mlDsa.update(user1.getEmail().getBytes());
                if (mlDsa.verify(signature)); {
                    System.out.println("User Verified Successfully against MLDSA algorithm Now the vote can be Entered");
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User Verification failed");
            }

            MyObject obj = userService.decryptData(encryptedPayload, Base64.getEncoder().encodeToString(sharedSecret)  , MyObject.class);

        // Extract fields
        Long userId = (Long) obj.getUserId();
        Long electionId = (Long) obj.getElectionId();
        Long candidateId = (Long) obj.getCandidateId();

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

        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Decryption failed");
        }
    } 

   
}
