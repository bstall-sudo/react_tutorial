package com.studiostate.selfdesk.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class SessionRequestDto {

    private String userName;
    private Long userId;
    private Long passId;
    private String passType;
    private Boolean paid;
    private Boolean open;
    private String sessionComment;
    private Instant clientStartTime;
    private Instant clientEndTime;
    private Instant serverStartTime;
    private Instant serverEndTime;

}

