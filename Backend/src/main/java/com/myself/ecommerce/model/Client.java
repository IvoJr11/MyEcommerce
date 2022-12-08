package com.myself.ecommerce.model;

import javax.persistence.*;

import java.util.*;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
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

    @OneToMany(mappedBy = "client")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Transaction> transactions = new HashSet<>();

    public Client (String name, String username, String email, String password, String cellphone, CreditCard creditCard) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.cellPhone = cellphone;
        this.creditCard = creditCard;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

    public void setCreditCard(CreditCard creditCard) {
        this.creditCard = creditCard;
    }
}
