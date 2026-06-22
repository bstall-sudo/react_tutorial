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
    private Instant checkInAt;
    private Instant checkOutAt;
    private String userName;
    private Long userId;


    private String sessionComment;

}

