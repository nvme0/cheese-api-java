package com.cheese.api.cheese;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/cheese")
public class CheeseController {

  @Autowired
  private CheeseRepository cheeseRepository;

  @GetMapping
  public List<Cheese> list() {
    return cheeseRepository.findAll();
  }

  @GetMapping("{id}")
  public Cheese get(@PathVariable Integer id) {
    Optional<Cheese> cheese = cheeseRepository.findById(id);
    if (!cheese.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cheese does not exist.");
    }
    return cheese.get();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public Cheese create(@RequestBody final Cheese cheese) {
    // TODO add validation for attributes passed in are correct, otherwise return a
    // 400 Bad Request
    return cheeseRepository.saveAndFlush(cheese);
  }

  @PutMapping("{id}")
  public Cheese update(@PathVariable Integer id, @RequestBody Cheese cheese) {
    // TODO add validation for attributes passed in are correct, otherwise return a
    // 400 Bad Request
    if (id != cheese.getId()) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Id does not match.");
    }

    Optional<Cheese> existingCheese = cheeseRepository.findById(id);
    if (!existingCheese.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cheese does not exist.");
    }

    Cheese updatedCheese = existingCheese.get();
    BeanUtils.copyProperties(cheese, updatedCheese, "id");
    return cheeseRepository.saveAndFlush(updatedCheese);
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Integer id) {
    Optional<Cheese> cheese = cheeseRepository.findById(id);
    if (cheese.isPresent()) {
      cheeseRepository.deleteById(id);
    }
  }
}
