package com.example.Secure_voting.Repository;

import com.example.Secure_voting.Entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {
}
