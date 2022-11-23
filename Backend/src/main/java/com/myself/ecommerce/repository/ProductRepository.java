package com.myself.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myself.ecommerce.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  
}
