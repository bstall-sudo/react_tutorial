package com.studiostate.selfdesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassResponseDto {

    private Long userId;
    private Long passId;
    private String userName;
    private String comments;
    private Long remainingSeconds;

    private Long expiryDateTime;
    private String passType;
    private Boolean paid;
    private Boolean active;
}

