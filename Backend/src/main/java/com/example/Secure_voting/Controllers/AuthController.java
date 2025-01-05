package com.example.Secure_voting.Controllers;


import com.example.Secure_voting.Entity.User;
import com.example.Secure_voting.Repository.UserRepository;
import com.example.Secure_voting.Service.UserService;


import lombok.Data;

import java.util.Map;

import jakarta.servlet.http.Cookie;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Data
public class AuthController {
    
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

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

    @PostMapping("/register-user")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        System.out.println(user);
        if (userService.isAadhaarNumberExists(user.getAadharNumber())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Aadhaar number is already in use.");
        }
        userRepository.save(user);
        System.out.println("success");
        String result="valid";
        return ResponseEntity.ok(result);
    }

      @PostMapping("/login")
    public ResponseEntity<Map<String,Object>> loginUser(@RequestBody Map<String, String> loginRequest, HttpSession session, HttpServletResponse response) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        User user = userService.findByEmail(email);

        if (user != null && user.getPassword().equals(password)) {
            // Store user information in session
            session.setAttribute("user", user);
            Cookie sessionCookie = new Cookie("session_id", session.getId());
            sessionCookie.setHttpOnly(true);
            sessionCookie.setMaxAge(30 * 60);// 30 minutes session timeout
            sessionCookie.setSecure(false); 
            response.addCookie(sessionCookie);
            System.out.println(session.getAttribute("user"));

             // Create response with role
             Map<String, Object> responseMap = Map.of(
                "message", "Login successful",
                "role", user.getRole(),
                "user",user,
                "sessioncookie", session.getId().toString()
            );
            return ResponseEntity.ok(responseMap);
        } else {
            Map<String, Object> responseMap = Map.of(
                "message", "Invalid credentials"
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body( responseMap);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout successful");
    }
  
}
