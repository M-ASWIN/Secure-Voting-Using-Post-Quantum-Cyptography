package com.example.Secure_voting.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String party;

  
}

