package com.myself.ecommerce.model;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Collection;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private String cellPhone;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();
    @OneToOne(fetch = FetchType.EAGER, cascade = {CascadeType.REMOVE})
    private CreditCard creditCard;
    
}
