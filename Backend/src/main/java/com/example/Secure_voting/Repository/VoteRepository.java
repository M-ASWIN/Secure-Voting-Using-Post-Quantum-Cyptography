package com.example.Secure_voting.Repository;

import com.example.Secure_voting.Entity.Election;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Entity.Vote;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUserAndElection(User user, Election election);

    @Modifying
    @Transactional
    @Query("DELETE FROM Vote v WHERE v.election.id = :electionId")
    void deleteByElectionId(@Param("electionId") Long electionId);

    @Query("SELECT v.candidate.id, v.candidate.name, COUNT(v) as votes " +
           "FROM Vote v WHERE v.election.id = :electionId " +
           "GROUP BY v.candidate.id, v.candidate.name " +
           "ORDER BY votes DESC")
    List<Object[]> getElectionResults(@Param("electionId") Long electionId);
}

