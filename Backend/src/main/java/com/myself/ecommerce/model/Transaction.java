package com.myself.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Setter
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id")
    private Client client;
    private String name;
    private double amount;
    private String description;
    private TransactionType type;
    private LocalDateTime date;

    public Transaction (String name, Double amount, String description, TransactionType transactionType, LocalDateTime date, Client client) {
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.type = transactionType;
        this.date = date;
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getAmount() {
        return amount;
    }

    public TransactionType getType() {return type;}

    public LocalDateTime getDate() { return date;}

    public String getDescription() {
        return description;
    }
}
