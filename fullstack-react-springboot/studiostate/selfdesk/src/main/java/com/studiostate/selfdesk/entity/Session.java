package com.studiostate.selfdesk.entity;

import com.studiostate.selfdesk.dto.SessionResponseDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table (name="sessions")
public class Session extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id", nullable = false)
    private Long sessionId;

    @Column(name = "user_name", nullable = true)
    private String userName;

    @Column(name = "user_id", nullable = true)
    private Long userId;

    @Column(name = "pass_id", nullable = true)
    private Long passId;

    @Column(name = "pass_type", nullable = true)
    private String passType;

    @Column(name = "paid", nullable = true)
    private Boolean paid;

    @Column(name = "open", nullable = false)
    private Boolean open;

    @Column(name = "session_comment", nullable = true)
    private String sessionComment;

    @Column(name = "server_start_time", nullable = true)
    private Instant serverStartTime;

    @Column(name = "server_end_time", nullable = true)
    private Instant serverEndTime;

    @Column(name = "client_start_time", nullable = true)
    private Instant clientStartTime;

    @Column(name = "client_end_time", nullable = true)
    private Instant clientEndTime;

}