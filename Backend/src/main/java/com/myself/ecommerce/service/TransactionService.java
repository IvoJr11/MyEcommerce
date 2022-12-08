package com.myself.ecommerce.service;

import com.myself.ecommerce.model.Transaction;

import java.util.Set;

public interface TransactionService {
    void saveTransaction(Transaction transaction);
    Set<Transaction> getTransactionsByClient(String username);
}
