package com.studiostate.selfdesk.entity;

import com.studiostate.selfdesk.dto.SessionAllocationResponseDto;
import com.studiostate.selfdesk.dto.SessionResponseDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

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


    @Column(name = "open", nullable = false)
    private Boolean open;

    @Column(name = "session_comment", nullable = true)
    private String sessionComment;

    @Column(name = "check_in_at", nullable = true)
    private Instant checkInAt;

    @Column(name = "check_out_at", nullable = true)
    private Instant checkOutAt;

    @OneToMany(mappedBy = "session", fetch = FetchType.LAZY)
    private List<SessionAllocation> allocations;




}