package com.example.beans;

import jakarta.annotation.PostConstruct;  /*this needs a dependency in the pom.xml*/
import org.springframework.stereotype.Component;

@Component
public class Vehicle {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Printing Hello from Component Vehicle Bean");
    }

    @PostConstruct  /*this needs the jakarta import above
    we need the postconstruct to be able to store data in the component/bean */
    public void initialize() {
        this.name = "Honda";
    }
}
