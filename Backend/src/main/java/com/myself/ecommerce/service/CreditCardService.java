package com.myself.ecommerce.service;

import com.myself.ecommerce.model.CreditCard;

public interface CreditCardService {
    public CreditCard getCardByNumber(String number);
    public CreditCard createCreditCard(CreditCard creditCard);
}
