package com.myself.ecommerce.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.model.Role;
import com.myself.ecommerce.service.ClientService;
import com.myself.ecommerce.service.RoleService;

import lombok.Data;

import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
public class ClientController {

    @Autowired
    ClientService clientService;

    @Autowired
    RoleService roleService;
    
    @GetMapping("/clients/allClients")
    public ResponseEntity<List<Client>> getClients() {
        return ResponseEntity.ok().body(clientService.getClients());
    }

    @GetMapping("clients/currentClient")
    public Client getCurrentClient(Authentication authentication) {
        return clientService.getCurrentClient(authentication);
    }

    @PostMapping("/clients/addRole")
    public ResponseEntity<RoleToClientForm> addRoleToClient(@RequestBody RoleToClientForm info) {
        clientService.addRoleToClient(info.getUsername(), info.getRolName());
        
        return ResponseEntity.ok().build();
    }

    @PostMapping("/clients/register")
    public ResponseEntity<Object> register(@RequestBody Client client) {

        List<String> allUsernames = clientService.getClients().stream().map(Client::getUsername).collect(Collectors.toList());

        if(client.getName().isEmpty()) {
            return new ResponseEntity<>("Missing Data: name is empty", HttpStatus.BAD_REQUEST);
        }

        if(allUsernames.contains(client.getUsername())) {
            return new ResponseEntity<>("Error Data: username is already exist", HttpStatus.BAD_REQUEST);
        }

        if(client.getUsername().isEmpty()) {
            return new ResponseEntity<>("Missing Data: username is empty", HttpStatus.BAD_REQUEST);
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

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/clients/register").toUriString());

        return ResponseEntity.created(uri).body(clientService.addClient(client));
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                Client client = clientService.getClient(username);
                String access_token = JWT.create()
                        .withSubject(client.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", client.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                response.setHeader("error", e.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", e.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }

        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
}

@Data
class RoleToClientForm {
    private String username;
    private String rolName;
}