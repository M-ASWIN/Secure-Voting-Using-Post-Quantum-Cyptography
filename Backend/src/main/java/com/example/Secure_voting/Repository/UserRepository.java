package com.example.Secure_voting.Repository;

import com.example.Secure_voting.Entity.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);
    Optional<User> findByEmail(String email);
    boolean existsByAadharNumber(String aadharNumber);
}
