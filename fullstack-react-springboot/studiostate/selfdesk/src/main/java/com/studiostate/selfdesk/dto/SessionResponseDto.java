package com.studiostate.selfdesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SessionResponseDto {

    private String userName;
    private Long sessionId;
    private boolean open;
    private Instant checkInAt;
    private Instant checkOutAt;

    private List<SessionAllocationResponseDto> allocations;
}

