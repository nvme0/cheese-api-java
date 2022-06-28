package com.cheese.api.cheese;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrowsExactly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.server.ResponseStatusException;

@SpringBootTest
public class CheeseControllerTests {

  @Autowired
  private CheeseController controller;

  @MockBean
  private CheeseRepository cheeseRepository;

  @Test
  void whenListCheese_shouldListCheese() {
    Cheese mockCheese = new Cheese("Blue cheese", "blue", 599);
    when(cheeseRepository.findAll()).thenReturn(List.of(mockCheese));

    assertEquals(controller.list(), List.of(mockCheese));
  }

  @Test
  void whenGetCheese_shouldGetCheese() {
    Cheese mockCheese = new Cheese("Blue cheese", "blue", 599);
    when(cheeseRepository.findById(mockCheese.getId())).thenReturn(Optional.of(mockCheese));

    assertEquals(controller.get(mockCheese.getId()), mockCheese);
  }

  @Test
  void whenGetCheese_shouldThrow_ifCheeseDoesntExist() {
    when(cheeseRepository.findById(any())).thenReturn(Optional.empty());

    assertThrowsExactly(ResponseStatusException.class, () -> {
      controller.get(1);
    });
  }

  @Test
  void whenCreateCheese_shouldCreateCheese() {
    Cheese mockCheese = new Cheese("Blue cheese", "blue", 599);
    when(cheeseRepository.saveAndFlush(mockCheese)).thenReturn(mockCheese);

    assertEquals(controller.create(mockCheese), mockCheese);
  }

  @Test
  void whenUpdateCheese_shouldUpdateCheese() {
    Cheese mockExistingCheese = new Cheese("Blue cheese", "blue", 599);
    when(cheeseRepository.findById(mockExistingCheese.getId())).thenReturn(Optional.of(mockExistingCheese));

    Cheese mockUpdatedCheese = new Cheese("Dark Blue cheese", "dark blue", 675);
    when(cheeseRepository.saveAndFlush(any())).thenReturn(mockUpdatedCheese);

    var result = controller.update(mockExistingCheese.getId(), mockUpdatedCheese);
    assertEquals(result, mockUpdatedCheese);
  }

  @Test
  void whenUpdateCheese_shouldThrow_ifIdsDontMatch() {
    Cheese mockCheese = new Cheese("Blue cheese", "blue", 599);
    assertThrowsExactly(ResponseStatusException.class, () -> {
      controller.update(12345, mockCheese);
    });
  }

  @Test
  void whenUpdateCheese_shouldThrow_ifCheeseDoesntExist() {
    Cheese mockCheese = new Cheese("Blue cheese", "blue", 599);
    when(cheeseRepository.findById(any())).thenReturn(Optional.empty());

    assertThrowsExactly(ResponseStatusException.class, () -> {
      controller.update(mockCheese.getId(), mockCheese);
    });
  }

  @Test
  void whenDeleteCheese_shouldDeleteCheese() {
    Cheese mockExistingCheese = new Cheese("Blue cheese", "blue", 599);
    when(cheeseRepository.findById(mockExistingCheese.getId())).thenReturn(Optional.of(mockExistingCheese));

    controller.delete(mockExistingCheese.getId());

    verify(cheeseRepository, times(1)).deleteById(mockExistingCheese.getId());
  }
}
