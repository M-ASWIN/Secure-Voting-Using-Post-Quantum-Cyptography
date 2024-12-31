package com.example.Secure_voting.Controllers;


import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Service.UserService;

import lombok.Data;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Data
public class AuthController {
    private final UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userService.login(user.getUsername(), user.getPassword());
    }
}
