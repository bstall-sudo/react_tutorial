package com.studiostate.selfdesk.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionGetResponseDto {

    private Long sessionId;
    private boolean open;
    private Instant serverStartTime;
    private Instant clientStartTime;
    private Instant clientEndTime;
    private Instant serverEndTime;
    private String userName;
    private Long userId;
    private Long passId;
    private String passType;
    private Boolean paid;
    private String sessionComment;

}

