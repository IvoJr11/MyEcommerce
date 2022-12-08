package com.myself.ecommerce.controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.myself.ecommerce.model.Role;
import com.myself.ecommerce.service.RoleService;

@RestController
@RequestMapping("/api")
public class RoleController {
  
  @Autowired
  RoleService roleService;

  @PostMapping("/roles/createRol")
  public ResponseEntity<Role> createRole(@RequestBody Role role) {  
    URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/roles/createRol").toUriString());

    return ResponseEntity.created(uri).body(roleService.createRole(role));
  }
}
