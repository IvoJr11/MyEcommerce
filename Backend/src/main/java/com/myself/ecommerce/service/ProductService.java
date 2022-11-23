package com.myself.ecommerce.service;
import java.util.List;

import com.myself.ecommerce.model.Product;


public interface ProductService {

  public List<Product> getProducts();

  public Product addProduct(Product product);

}
