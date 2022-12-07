package com.myself.ecommerce;

import java.time.LocalDateTime;
import java.util.ArrayList;

import com.myself.ecommerce.model.CreditCard;
import com.myself.ecommerce.service.CreditCardService;
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
	public CommandLineRunner initData(ClientService clientService, RoleService roleService, CreditCardService creditCardService) {
		return args -> {

			Role clientRole = new Role(null, "CLIENT");
			Role adminRole = new Role(null, "ADMIN");
			roleService.createRole(clientRole);
			roleService.createRole(adminRole);

			CreditCard creditCard = new CreditCard(null, "8931 9832 9530 5432", 101, LocalDateTime.now(), LocalDateTime.now().plusMonths(12));
			creditCardService.createCreditCard(creditCard);
			CreditCard creditCard2 = new CreditCard(null, "5423 6545 7652 1233", 910, LocalDateTime.now(), LocalDateTime.now().plusMonths(24));
			creditCardService.createCreditCard(creditCard2);

			Client ivoClient = new Client(null, "Ivo Pascal", "ivoPascal@gmail.com", "ivoPascal@gmail.com","ivoPascal", "2994137609", new ArrayList<>(), creditCard);
			Client valenClient = new Client(null, "Valentino Arena", "valenArena@gmail.com", "valenArena@gmail.com","valenArena", "2996827417", new ArrayList<>(), creditCard2);
			clientService.addClient(ivoClient);
			clientService.addClient(valenClient);

			clientService.addRoleToClient("ivoPascal@gmail.com", "CLIENT");
			clientService.addRoleToClient("ivoPascal@gmail.com", "ADMIN");
			clientService.addRoleToClient("valenArena@gmail.com", "ADMIN");

		};
	}
}
