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
public class SessionAllocationResponseDto {

    private Long allocationId;
    private String allocationType;
    private String paymentStatus;
    private Long passId;
    private Instant startAt;
    private Instant endAt;
    private Long seconds;
    private Long amountCents;
}