package com.example.beans;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class Engine {

    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public Engine() {
        System.out.println("Engine bean created by Spring");
    }


    public void sayHello() {
        System.out.println("Printing Hello from Component Engine Bean");
    }

    @PostConstruct
    public void initialize() {
        this.name = "V8";
    }

    @Override
    public String toString() {
        return "Engine{" +
                "name='" + name + '\'' +
                '}';
    }
}
