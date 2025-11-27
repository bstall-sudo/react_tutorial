package com.example.config;

import com.example.beans.Vehicle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;


@Configuration
public class ProjectConfig {


    @Bean(value="Ente") /*this way we can give a name to a certain bean*/
    Vehicle vehicle1() {
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Ente");
        return vehicle;
    }

    @Bean("ferrariVehicle") /*this way we can give a name to a certain bean*/
    Vehicle vehicle2() {
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Ferrari");
        return vehicle;
    }

    @Primary  /*like this, using Primary, this Vehicle bean is the default bean*/
    @Bean(name="hondaVehicle") /*this way we can give a name to a certain bean*/
    Vehicle vehicle3() {
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Honda");
        return vehicle;
    }


}