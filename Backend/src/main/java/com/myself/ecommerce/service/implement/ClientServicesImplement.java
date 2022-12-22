package com.myself.ecommerce.service.implement;

import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.model.Role;
import com.myself.ecommerce.repository.ClientRepository;
import com.myself.ecommerce.repository.RoleRepository;
import com.myself.ecommerce.service.ClientService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class ClientServicesImplement implements ClientService, UserDetailsService {

    private final RoleRepository roleRepository;
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Client getClient(String username) {
        return clientRepository.findByEmail(username);
    }

    @Override
    public Client getCurrentClient(Authentication authentication) {
        return clientRepository.findByUsername(authentication.getName());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Client client = clientRepository.findByUsername(username);
        if(client == null) {
            log.error("Client not found in the database");
//            throw new UsernameNotFoundException("Client not found in the database");
            throw new UsernameNotFoundException("Error", new Throwable("Incorrect username"));
        } else {
            log.info("Client found in the database: {}", username);
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        client.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });

        return new org.springframework.security.core.userdetails.User(client.getUsername(), client.getPassword(), authorities);
    }



    @Override
    public Client addClient(Client client) {
        log.info("Saving Client to the Database");
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        return clientRepository.save(client);
    }

    @Override
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @Override
    public void addRoleToClient(String username, String roleName) {
        Client client = clientRepository.findByUsername(username);
        Role role = roleRepository.findByName(roleName);
        client.getRoles().add(role);
    }

}
