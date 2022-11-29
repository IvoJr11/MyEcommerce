package com.myself.ecommerce.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.myself.ecommerce.model.Client;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {

  private final Client client;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.emptyList();
  }

  @Override
  public String getPassword() {
    return client.getPassword();
  }

  @Override
  public String getUsername() {
    return client.getEmail();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
  
  public String getName() {
    return client.getName();
  }
}
