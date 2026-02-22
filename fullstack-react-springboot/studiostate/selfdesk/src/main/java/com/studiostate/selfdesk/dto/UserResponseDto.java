package com.studiostate.selfdesk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private Long userId;
    private String firstName;

    private String lastName;

    //private Instant createdAt;

    //private String createdBy;

}

