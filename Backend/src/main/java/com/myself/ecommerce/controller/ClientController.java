package com.myself.ecommerce.controller;

import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.repository.ClientRepository;
import com.myself.ecommerce.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ClientController {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    ClientService clientService;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody Client client) {

        if(client.getName().isEmpty()) {
            return new ResponseEntity<>("Missing Data: name is empty", HttpStatus.BAD_REQUEST);
        }

        if(client.getLastName().isEmpty()) {
            return new ResponseEntity<>("Missing Data: lastname is empty", HttpStatus.BAD_REQUEST);
        }

        if(client.getEmail().isEmpty()) {
            return new ResponseEntity<>("Missing Data: email is empty", HttpStatus.BAD_REQUEST);
        }

        if(client.getPassword().isEmpty()) {
            return new ResponseEntity<>("Missing Data: password is empty", HttpStatus.BAD_REQUEST);
        }

        if(client.getCellPhone().isEmpty()) {
            return new ResponseEntity<>("Missing Data: cellphone is empty", HttpStatus.BAD_REQUEST);
        }

        clientService.addClient(client);

        return new ResponseEntity<>("created", HttpStatus.CREATED);
    }
}
