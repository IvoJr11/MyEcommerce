package com.myself.ecommerce.service.implement;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myself.ecommerce.model.Product;
import com.myself.ecommerce.repository.ProductRepository;
import com.myself.ecommerce.service.ProductService;

@Service
public class ProductServiceImplement implements ProductService {
  
  @Autowired
  ProductRepository productRepository;

  public List<Product> getProducts() {
    return productRepository.findAll();
  }

  public Product addProduct(Product product) {
    return productRepository.save(product);
  }
}
