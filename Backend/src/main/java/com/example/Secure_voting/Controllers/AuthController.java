package com.example.Secure_voting.Controllers;


import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Service.UserService;

import lombok.Data;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
@Data
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/validate-user")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> request) {
        String aadharNumber = request.get("aadharNumber");

        try {
            String result = userService.registerUser(aadharNumber);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }
}
