package com.example.Secure_voting.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.Secure_voting.Entity.Election;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
     @Query("SELECT e FROM Election e WHERE e.id NOT IN " +
           "(SELECT v.election.id FROM Vote v WHERE v.user.id = :userId)")
    List<Election> findAvailableElections(Long userId);
}
