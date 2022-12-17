package com.myself.ecommerce;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;

import com.myself.ecommerce.model.*;
import com.myself.ecommerce.service.CreditCardService;
import com.myself.ecommerce.service.TransactionService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
	public CommandLineRunner initData(ClientService clientService, RoleService roleService, CreditCardService creditCardService, TransactionService transactionService) {
		return args -> {


			Role clientRole = new Role(null, "CLIENT");
			Role adminRole = new Role(null, "ADMIN");
			roleService.createRole(clientRole);
			roleService.createRole(adminRole);

			CreditCard creditCard = new CreditCard(null, "8931 9832 9530 5432",125000d, 101, LocalDateTime.now(), LocalDateTime.now().plusMonths(12));
			creditCardService.createCreditCard(creditCard);
			CreditCard creditCard2 = new CreditCard(null, "5423 6545 7652 1233",45000d, 910, LocalDateTime.now(), LocalDateTime.now().plusMonths(24));
			creditCardService.createCreditCard(creditCard2);

			Client ivoClient = new Client("Ivo Pascal", "ivoPascal@gmail.com", "ivoPascal@gmail.com","ivoPascal", "2994137609", creditCard);
			Client valenClient = new Client("Valentino Arena", "valenArena@gmail.com", "valenArena@gmail.com","valenArena", "2996827417", creditCard2);
			clientService.addClient(ivoClient);
			clientService.addClient(valenClient);

			Transaction transaction = new Transaction("Steam Purchase 425-952-2985 Deu", 5284d, "Compra de Hollow Night", TransactionType.DEBIT, LocalDateTime.now(), ivoClient);
			Transaction transaction8 = new Transaction("Mercadopago, CABA", 1408d, "Transferencia", TransactionType.DEBIT, LocalDateTime.now().minusDays(5), ivoClient);
			Transaction transaction7 = new Transaction("Mercadopago, CABA", 1250.60, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusDays(20), ivoClient);
			Transaction transaction4 = new Transaction("Mercadopago, CABA", 15000.05, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusMonths(1).plusDays(2), ivoClient);
			Transaction transaction9 = new Transaction("Mercadopago, CABA", 4321d, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusMonths(2).plusDays(3), ivoClient);
			Transaction transaction2 = new Transaction("Mercadopago, CABA", 5000d, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusMonths(5), ivoClient);
			Transaction transaction3 = new Transaction("Mercadopago, CABA", 5000d, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusMonths(5), ivoClient);
			Transaction transaction11 = new Transaction("Mercadopago, CABA", 11312d, "Transferencia", TransactionType.DEBIT, LocalDateTime.now().minusMonths(5), ivoClient);
			Transaction transaction5 = new Transaction("Mercadopago, CABA", 2684d, "Transferencia", TransactionType.DEBIT, LocalDateTime.now().minusMonths(7), ivoClient);
			Transaction transaction6 = new Transaction("Mercadopago, CABA", 1000d, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusMonths(7), ivoClient);
			Transaction transaction10 = new Transaction("Mercadopago, CABA", 7520d, "Transferencia", TransactionType.CREDIT, LocalDateTime.now().minusYears(2).plusDays(1), ivoClient);


			transactionService.saveTransaction(transaction);
			transactionService.saveTransaction(transaction2);
			transactionService.saveTransaction(transaction3);
			transactionService.saveTransaction(transaction4);
			transactionService.saveTransaction(transaction5);
			transactionService.saveTransaction(transaction6);
			transactionService.saveTransaction(transaction7);
			transactionService.saveTransaction(transaction8);
			transactionService.saveTransaction(transaction9);
			transactionService.saveTransaction(transaction10);
			transactionService.saveTransaction(transaction11);

			clientService.addRoleToClient("ivoPascal@gmail.com", "CLIENT");
			clientService.addRoleToClient("ivoPascal@gmail.com", "ADMIN");
			clientService.addRoleToClient("valenArena@gmail.com", "ADMIN");

		};
	}
}
