package com.example.Secure_voting.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Secure_voting.Entity.Aadhaar;

public interface AadhaarRepository extends JpaRepository<Aadhaar, Long> {
    Optional<Aadhaar> findByAadharNumber(String aadharNumber);
}

