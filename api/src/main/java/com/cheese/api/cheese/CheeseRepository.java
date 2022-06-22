package com.cheese.api.cheese;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CheeseRepository extends JpaRepository<Cheese, String> {

}
