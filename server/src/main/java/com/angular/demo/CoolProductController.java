package com.angular.demo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
public class CoolProductController {
    private ProductRepository repository;
    
    public CoolProductController(ProductRepository repository) {
        this.repository = repository;
    }
    
    @GetMapping("/cool-products")
    @CrossOrigin(origins = "http://localhost:4200")
    public Collection<Product> coolProducts() {
        return repository.findAll().stream()
                .collect(Collectors.toList());
    }

}