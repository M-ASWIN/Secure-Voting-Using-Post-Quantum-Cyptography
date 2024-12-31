package com.example.Secure_voting.Service;


import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Repository.UserRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@Data
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        throw new RuntimeException("Invalid credentials");
    }
    
    public User registerUser(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        // Save the user
        return userRepository.save(user);
    }
}
