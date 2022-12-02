package com.myself.ecommerce;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.myself.ecommerce.model.Client;
import com.myself.ecommerce.model.Role;
import com.myself.ecommerce.repository.ClientRepository;
import com.myself.ecommerce.service.ClientService;
import com.myself.ecommerce.service.RoleService;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ECommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ECommerceApplication.class, args);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CommandLineRunner initData(ClientService clientService, RoleService roleService) {
		return args -> {
			
			roleService.createRole(new Role(null, "CLIENT"));
			roleService.createRole(new Role(null, "ADMIN"));

			clientService.addClient(new Client(null, "Valentino Arena", "valenArena@gmail.com", "valenArena@gmail.com","valenArena", "2996827417", new ArrayList<>()));
			clientService.addClient(new Client(null, "Ivo Pascal", "ivoPascal@gmail.com", "ivoPascal@gmail.com","ivoPascal", "2994137609", new ArrayList<>()));
		
			clientService.addRoleToClient("ivoPascal@gmail.com", "CLIENT");
			clientService.addRoleToClient("ivoPascal@gmail.com", "ADMIN");
			clientService.addRoleToClient("valenArena@gmail.com", "ADMIN");
		};
	}
}
