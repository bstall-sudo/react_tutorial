package com.example.beans;

import org.springframework.stereotype.Component;

@Component("cappuccino")
public class Capuccino implements Coffee{

    @Override
    public String makeCoffee() {
        return "Cappuccino Coffee";
    }
}
