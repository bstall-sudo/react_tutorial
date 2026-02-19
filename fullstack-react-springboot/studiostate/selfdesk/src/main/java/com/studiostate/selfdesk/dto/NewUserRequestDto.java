package com.studiostate.selfdesk.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter

public class NewUserRequestDto {

    @NotBlank(message="Name can not be empty.")
    @Size(min= 4, max=50, message="Name must be between 4 and 50 characters")
    private String userName;
    @Email(message="Invalid Email address.")
    @NotBlank(message="Email can not be empty.")
    private String email;
    @Pattern(regexp = "^(\\+|00|0)\\d{5,15}", message = "Mobile Number must start with 0,00 or + and have 6-17 digits")
    @NotBlank(message="Mobile Number can not be empty.")
    private String mobileNumber;
    @NotBlank(message="Message can not be empty.")
    @Size(min=5, max = 500, message="Message must have 5-500 characters.")
    private String comments;

    private String street;

    private String postalCode;

    private String country;

    private String category;



}