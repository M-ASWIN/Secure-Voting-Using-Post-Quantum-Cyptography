package com.example.Secure_voting.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private LocalDate dob;
    private String fatherName;
    private String mobileNumber;
    private String email;
    @ManyToOne
    @JoinColumn(name = "aadhar_id")
    private Aadhaar aadhaar;

    private String password;
    private String role = "USER"; // Default role
  

}
