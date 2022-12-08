package com.myself.ecommerce.service.implement;

import com.myself.ecommerce.model.Transaction;
import com.myself.ecommerce.repository.ClientRepository;
import com.myself.ecommerce.repository.TransactionRepository;
import com.myself.ecommerce.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class TransactionServiceImplement implements TransactionService {
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    ClientRepository clientRepository;

    @Override
    public void saveTransaction(Transaction transaction) {
        transactionRepository.save(transaction);
    }

    @Override
    public Set<Transaction> getTransactionsByClient(String username) {
        return clientRepository.findByUsername(username).getTransactions();
    }
}
