package com.example.Secure_voting.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User voter;

    @ManyToOne
    private Candidate candidate;

}
