package com.myself.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.myself.ecommerce.model.Product;
import com.myself.ecommerce.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
  
  @Autowired
  ProductService productService;

  @GetMapping("/getAll")
  public List<Product> getProducts() {
    return productService.getProducts();
  }

  @PostMapping("/create")
  public ResponseEntity<Object> createProduct(@RequestBody Product product) {
    
    
    productService.addProduct(product);

    return new ResponseEntity<>("Product has been added successfully", HttpStatus.ACCEPTED);
  }
}
