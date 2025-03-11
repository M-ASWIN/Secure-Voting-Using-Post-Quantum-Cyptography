package com.example.Secure_voting.Dto;


public class ResultDTO {

    private String name;
    private String party;
    private int votes;
    private double percentage;

    public ResultDTO(String name, String party, int votes, double percentage) {
        this.name = name;
        this.party = party;
        this.votes = votes;
        this.percentage = percentage;
    }

    public String getName() {
        return name;
    }

    public String getParty() {
        return party;
    }

    public int getVotes() {
        return votes;
    }

    public double getPercentage() {
        return percentage;
    }
}
