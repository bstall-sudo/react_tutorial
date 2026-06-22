package com.studiostate.selfdesk.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class SessionRequestDto {

    private String userName;
    private Long userId;
    private Boolean open;
    private String sessionComment;
    private Instant checkInAt;
    private Instant checkOutAt;

}

