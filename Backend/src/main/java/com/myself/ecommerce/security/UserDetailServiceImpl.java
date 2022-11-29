package com.myself.ecommerce.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.repository.ClientRepository;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
  
  @Autowired
  private ClientRepository clientRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Client client = clientRepository
      .findByEmail(email)
      .orElseThrow(() -> new UsernameNotFoundException( "User with email " + email + " doensn't exist."));
  
    return new UserDetailsImpl(client);
  }
  

}
