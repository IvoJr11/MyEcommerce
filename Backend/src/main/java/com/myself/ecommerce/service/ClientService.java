package com.myself.ecommerce.service;

import java.util.List;

import com.myself.ecommerce.model.Client;


public interface ClientService {

    public Client addClient(Client client);

    public List<Client> getClients();

}
