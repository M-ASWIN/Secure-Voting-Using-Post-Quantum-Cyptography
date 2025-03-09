// package com.example.Secure_voting.Service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.example.Secure_voting.Entity.Election;
// import com.example.Secure_voting.Repository.ElectionRepository;

// import java.time.LocalDate;
// import java.util.List;

// @Service
// public class ElectionService {

//     @Autowired
//     private ElectionRepository electionRepository;

//     public Election createElection(Election election) {
//         return electionRepository.save(election);
//     }

//     public List<Election> getOngoingElections() {
//         LocalDate today = LocalDate.now();
//         return electionRepository.findByStartDateBeforeAndEndDateAfter(today, today);
//     }

// }

