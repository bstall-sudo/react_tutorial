package com.studiostate.selfdesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PassCreateResponseDto {

    private Long userId;
    private Long passId;
    private String userName;
    private Long remainingSeconds;
    private String passType;
    private Boolean paid;
    private Boolean active;
}

