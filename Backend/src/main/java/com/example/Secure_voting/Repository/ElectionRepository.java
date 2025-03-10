package com.example.Secure_voting.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Secure_voting.Entity.Election;

@Repository
public interface ElectionRepository extends JpaRepository<Election, Long> {
}
