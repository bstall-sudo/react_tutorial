package com.studiostate.selfdesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponseDto {

    private Long sessionId;
    private boolean open;
    private Instant serverStartTime;
    private Instant clientStartTime;
    private Instant clientEndTime;
    private Instant serverEndTime;

}

