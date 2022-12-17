package com.myself.ecommerce.controller;

import com.myself.ecommerce.dtos.TransactionInfoDTO;
import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.model.Transaction;
import com.myself.ecommerce.model.TransactionType;
import com.myself.ecommerce.service.ClientService;
import com.myself.ecommerce.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class TransactionController {
    @Autowired
    TransactionService transactionService;

    @Autowired
    ClientService clientService;

    @GetMapping("/transaction/getAll")
    public Set<Transaction> getTransactionsByClient(@RequestParam String username) {
        return transactionService.getTransactionsByClient(username);
    }

    @Transactional
    @PostMapping("/transaction/create")
    public ResponseEntity<Object> createTransaction(@RequestBody TransactionInfoDTO transactionInfo) {
        Client sourceClient = clientService.getClient(transactionInfo.getSource_username());
        Client destinationClient = clientService.getClient(transactionInfo.getDestination_username());

        if (transactionInfo.getName().isEmpty()) {
            return ResponseEntity.status(403).body("Missing Data: name is empty");
        }

        if(transactionInfo.getDescription().isEmpty()) {
            return ResponseEntity.status(403).body("Missing Data: description is empty");
        }

        if(transactionInfo.getAmount() <= 0) {
            return ResponseEntity.status(403).body("Missing Data: amount can't be 0 or minus");
        }

        if(transactionInfo.getSource_username().isEmpty()) {
            return ResponseEntity.status(403).body("Missing Data: source username is empty");
        }

        if(transactionInfo.getDestination_username().isEmpty()) {
            return ResponseEntity.status(403).body("Missing Data: destination username is empty");
        }

        sourceClient.getCreditCard().setMount(sourceClient.getCreditCard().getMount() - transactionInfo.getAmount());
        destinationClient.getCreditCard().setMount(destinationClient.getCreditCard().getMount() + transactionInfo.getAmount());

        clientService.addClient(sourceClient);
        clientService.addClient(destinationClient);

        transactionService.saveTransaction(new Transaction(transactionInfo.getName(), transactionInfo.getAmount(), transactionInfo.getDescription(), TransactionType.DEBIT, LocalDateTime.now(), sourceClient));
        transactionService.saveTransaction(new Transaction(transactionInfo.getName(), transactionInfo.getAmount(), transactionInfo.getDescription(), TransactionType.CREDIT, LocalDateTime.now(), destinationClient));

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/transaction/create").toUriString());
        return ResponseEntity.created(uri).body("Transaction has been complete successfully");
    }
}
