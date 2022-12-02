package com.myself.ecommerce.service.implement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myself.ecommerce.model.Role;
import com.myself.ecommerce.repository.RoleRepository;
import com.myself.ecommerce.service.RoleService;

@Service
public class RoleServiceImplement implements RoleService {

  @Autowired
  RoleRepository roleRepository;

  @Override
  public Role createRole(Role role) {
    return roleRepository.save(role);
  }
  
}
