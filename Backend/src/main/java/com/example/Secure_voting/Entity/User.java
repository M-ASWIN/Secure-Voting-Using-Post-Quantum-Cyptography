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

    private String name;
    private LocalDate dob;
    private String fatherName;
    private String mobileNumber;
    private String email;
    private String aadharNumber;  
    private String password;
    private String role = "USER"; // Default role
  

}
