package com.example.Secure_voting.Dto;

import lombok.Data;

public class ResultDTO {

    private String name;

    private int votes;
    private double percentage;

    public ResultDTO(String name, int votes, double percentage) {
        this.name = name;
        this.votes = votes;
        this.percentage = percentage;
    }

    public String getName() {
        return name;
    }

    public int getVotes() {
        return votes;
    }

    public double getPercentage() {
        return percentage;
    }
}

