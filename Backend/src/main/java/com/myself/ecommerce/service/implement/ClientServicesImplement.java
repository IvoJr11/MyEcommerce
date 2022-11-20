package com.myself.ecommerce.service.implement;

import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.repository.ClientRepository;
import com.myself.ecommerce.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServicesImplement implements ClientService {

    @Autowired
    ClientRepository clientRepository;

    @Override
    public Client addClient(Client client) {
        return clientRepository.save(client);
    }
}
