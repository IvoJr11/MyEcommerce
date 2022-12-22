package com.myself.ecommerce.repository;

import com.myself.ecommerce.model.Client;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
  Client findByUsername(String username);
  Client findByEmail(String email);
}
