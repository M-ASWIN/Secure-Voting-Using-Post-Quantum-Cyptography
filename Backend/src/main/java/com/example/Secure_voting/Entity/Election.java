// package com.example.Secure_voting.Entity;

// import jakarta.persistence.*;
// import lombok.Data;

// import java.time.LocalDate;
// import java.util.List;

// @Data
// @Entity
// public class Election {
    
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
    
//     private String name;
//     private LocalDate startDate;
//     private LocalDate endDate;

//     @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//       private List<Candidate> candidates;

//     public Election() {}

//     public Election(String name, LocalDate startDate, LocalDate endDate, List<Candidate> candidates) {
//         this.name = name;
//         this.startDate = startDate;
//         this.endDate = endDate;
//         this.candidates = candidates;
//     }

//     // Getters and Setters
// }
