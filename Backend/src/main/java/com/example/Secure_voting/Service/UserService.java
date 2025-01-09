package com.example.Secure_voting.Service;


import com.example.Secure_voting.Entity.Aadhaar;
import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Repository.AadhaarRepository;
import com.example.Secure_voting.Repository.UserRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@Data
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AadhaarRepository aadhaarRepository;

    public String registerUser(String aadharNumber) {
        Optional<Aadhaar> existingAadhaar = aadhaarRepository.findByAadharNumber(aadharNumber);
        if (existingAadhaar.isPresent()) {
            return "valid";

        } else {
            throw new IllegalArgumentException("Aadhaar number not found in records");
        }
    }

    public boolean isAadhaarNumberExists(String aadhaarNumber) {
        return userRepository.existsByAadharNumber(aadhaarNumber);
    }
    

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }
}
