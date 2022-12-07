package com.myself.ecommerce.service.implement;

import com.myself.ecommerce.model.CreditCard;
import com.myself.ecommerce.repository.CreditCardRepository;
import com.myself.ecommerce.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class CreditCardServiceImplement implements CreditCardService {
    @Autowired
    private final CreditCardRepository creditCardRepository;

    @Override
    public CreditCard getCardByNumber(String number) {
        return creditCardRepository.findByNumber(number);
    }

    @Override
    public CreditCard createCreditCard(CreditCard creditCard) {
        return creditCardRepository.save(creditCard);
    }

}
