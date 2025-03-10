package com.example.Secure_voting.Dto;

import lombok.Data;

@Data
public class VoteRequest {
        private Long userId;
        private Long electionId;
        private Long candidateId;
    
        // Constructors
        public VoteRequest() {}
    
        public VoteRequest(Long userId, Long electionId, Long candidateId) {
            this.userId = userId;
            this.electionId = electionId;
            this.candidateId = candidateId;
        }
    
        // Getters and Setters
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
    
        public Long getElectionId() { return electionId; }
        public void setElectionId(Long electionId) { this.electionId = electionId; }
    
        public Long getCandidateId() { return candidateId; }
        public void setCandidateId(Long candidateId) { this.candidateId = candidateId; }
}
    
