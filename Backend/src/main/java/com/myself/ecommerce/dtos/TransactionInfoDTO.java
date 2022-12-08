package com.myself.ecommerce.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TransactionInfoDTO {
    private String name;
    private String description;
    private double amount;
    private String source_username;
    private String destination_username;
}
