package com.example.Secure_voting.Repository;


import com.example.Secure_voting.Entity.Candidate;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findAllById(Iterable<Long> ids);
}
