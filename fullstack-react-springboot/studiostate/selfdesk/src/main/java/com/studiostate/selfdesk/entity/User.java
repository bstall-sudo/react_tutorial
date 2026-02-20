package com.studiostate.selfdesk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table (name="users")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mobile_number", nullable = true)
    private String mobileNumber;

    @Column(name = "street", nullable = true)
    private String street;

    @Column(name = "postal_code", nullable = true)
    private String postalCode;

    @Column(name = "country", nullable = true)
    private String country;

    @Column(name = "password", nullable = true)
    private String password;

    @Column(name = "comments", nullable = true)
    private String comments;



}