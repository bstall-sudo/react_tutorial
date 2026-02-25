package com.studiostate.selfdesk.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class PassCreateRequestDto {

    private String userName;
    private Long userId;
    private Long remainingSeconds;
    private String passType;
    private Boolean paid;
    private Boolean active;
    private String comments;
    private Long expiryDateTime;

    private String createdBy;

    private String updatedBy;


}

