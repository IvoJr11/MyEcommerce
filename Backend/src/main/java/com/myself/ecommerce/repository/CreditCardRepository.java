package com.myself.ecommerce.repository;

import com.myself.ecommerce.model.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
    CreditCard findByNumber(String number);
}
