package com.studiostate.selfdesk.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter

public class NewUserRequestDto {

    @NotBlank(message="First Name can not be empty.")
    @Size(min= 2, max=15, message="First Name must have 2-15 characters.")
    private String firstName;
    @NotBlank(message="Last Name can not be empty.")
    @Size(min= 2, max=15, message="Last Name must have 2-15 characters.")
    private String lastName;
    @Email(message="Invalid Email address.")
    @NotBlank(message="Email can not be empty.")
    @Size(max=30, message="Email can't have more than 30 characters.")
    private String email;
    //@Pattern(regexp = "^(\\+|00|0)\\d{5,15}", message = "Mobile Number must start with 0,00 or + and have 6-17 digits")
    //@NotBlank(message="Mobile Number can not be empty.")
    private String mobileNumber;

    private String comments;

    private String street;

    private String postalCode;

    private String country;

    private String category;



}