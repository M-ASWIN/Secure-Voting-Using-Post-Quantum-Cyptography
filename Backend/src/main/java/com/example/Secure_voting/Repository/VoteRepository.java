package com.example.Secure_voting.Repository;

import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUserAndElection(User user, Election election);
}

