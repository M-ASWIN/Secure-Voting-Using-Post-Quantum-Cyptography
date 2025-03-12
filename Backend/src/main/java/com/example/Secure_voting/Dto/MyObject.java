package com.example.Secure_voting.Dto;
import com.fasterxml.jackson.annotation.JsonProperty;

public class MyObject {
    
    @JsonProperty("userId")
    private Long userId;
    
    @JsonProperty("electionId")
    private Long electionId;
    
    @JsonProperty("candidateId")
    private Long candidateId;

    // Getters and Setters
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getElectionId() {
        return electionId;
    }

    public void setElectionId(Long electionId) {
        this.electionId = electionId;
    }

    public Long getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(Long candidateId) {
        this.candidateId = candidateId;
    }
}
