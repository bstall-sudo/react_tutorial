package com.example.main;

import com.example.beans.Vehicle;
import com.example.config.ProjectConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringMain {

    public static void main(String[] args) {

        var context = new AnnotationConfigApplicationContext(ProjectConfig.class);

        Vehicle vehicle = context.getBean(Vehicle.class);

        System.out.println("Vehicle name from Spring Context is: " + vehicle.getName());



        String hello = context.getBean(String.class);

        System.out.println("Greeting from Spring Context is: " + hello);

        Integer num = context.getBean(Integer.class);

        System.out.println("The Integer from Spring Context is: " + num);


    }

}