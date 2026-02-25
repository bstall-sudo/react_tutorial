package com.studiostate.selfdesk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table (name="passes")
public class Pass extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pass_id", nullable = false)
    private Long passId;


    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "comments", nullable = true)
    private String comments;

    @Column(name = "remaining_seconds", nullable = false)
    private Long remainingSeconds;

    @Column(name = "pass_type", nullable = false)
    private String passType;

    @Column(name = "expiry_date_time", nullable = false)
    private Instant expiryDateTime;

    @Column(name = "paid", nullable = false)
    private Boolean paid;

    @Column(name = "active", nullable = false)
    private Boolean active;

}