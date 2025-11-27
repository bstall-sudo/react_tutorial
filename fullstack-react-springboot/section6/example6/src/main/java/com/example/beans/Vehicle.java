package com.example.beans;


import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
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

    //@Autowired
    private final Engine engine;

    @Autowired
    public Vehicle(Engine engine) {
        this.engine = engine;
        System.out.println("Vehicle bean created by Spring");
    }


    public void sayHello() {
        System.out.println("Printing Hello from Component Vehicle Bean");
    }

    public Engine getEngine() {
        return engine;
    }
    @Override
    public String toString() {
        return "Vehicle{" +
                "name='" + name + '\'' +
                '}';
    }

    @PostConstruct
    public void initialize() {
        this.name = "Kia";
    }
}
