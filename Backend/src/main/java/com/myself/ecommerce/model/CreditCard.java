package com.myself.ecommerce.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE})
//    private Client client;
    private String number;
    private int cvv;
    private LocalDateTime creationDate;
    private LocalDateTime expirationDate;
}
