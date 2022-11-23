package com.myself.ecommerce.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;
  private String description;
  @ElementCollection
  @Column( name = "images" )
  private List<String> images;
  @ElementCollection
  @Column( name = "colors" )
  private List<String> colors;
  private double price;
  private int stock;

  public Product () {/* TODO Product constructor */}

  public long getId() {return id;}
  public void setId(long id) {this.id = id;}

  public String getName() {return name;}
  public void setName(String name) {this.name = name;}

  public String getDescription() {return description;}
  public void setDescription(String description) {this.description = description;}

  public List<String> getImages() {return images;}
  public void setImages(List<String> images) {this.images = images;}

  public List<String> getColors() {return colors;}
  public void setColors(List<String> colors) {this.colors = colors;}

  public double getPrice() {return price;}
  public void setPrice(double price) {this.price = price;}

  public int getStock() {return stock;}
  public void setStock(int stock) {this.stock = stock;}

}
