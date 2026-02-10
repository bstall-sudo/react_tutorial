package com.studiostate.selfdesk.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class SessionEndRequestDto {

    private Instant clientEndTime;


}

