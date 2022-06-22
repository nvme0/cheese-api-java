package com.cheese.api.cheese;

import java.util.Optional;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "cheese")
public class Cheese {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private String id;

  /**
   * The name of the cheese
   */
  private String name;

  /**
   * The color of the cheese
   */
  private String color;

  /**
   * The price of the cheese per kilogram
   */
  private Integer pricePerKilo;

  /**
   * A url to an image of the cheese
   */
  private Optional<String> imageUrl;

  //
  // Constructors
  //

  /**
   * @param name         The name of the cheese
   * @param color        The color of the cheese
   * @param pricePerKilo The price of the cheese per kilogram
   */
  public Cheese(String name, String color, Integer pricePerKilo) {
    this.name = name;
    this.color = color;
    this.pricePerKilo = pricePerKilo;
  }

  //
  // Getters & Setters
  //

  public String getId() {
    return this.id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getColor() {
    return this.color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public Integer getPricePerKilo() {
    return this.pricePerKilo;
  }

  public void setPricePerKilo(Integer pricePerKilo) {
    this.pricePerKilo = pricePerKilo;
  }

  public Optional<String> getImageUrl() {
    return this.imageUrl;
  }

  public void setImageUrl(Optional<String> imageUrl) {
    this.imageUrl = imageUrl;
  }

  //
  // Builder Methods
  //

  public Cheese name(String name) {
    setName(name);
    return this;
  }

  public Cheese color(String color) {
    setColor(color);
    return this;
  }

  public Cheese pricePerKilo(Integer pricePerKilo) {
    setPricePerKilo(pricePerKilo);
    return this;
  }

  public Cheese imageUrl(Optional<String> imageUrl) {
    setImageUrl(imageUrl);
    return this;
  }
}
