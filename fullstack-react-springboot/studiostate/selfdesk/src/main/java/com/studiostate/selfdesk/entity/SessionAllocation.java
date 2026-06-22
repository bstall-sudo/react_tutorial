package com.studiostate.selfdesk.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "session_allocations")
public class SessionAllocation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "allocation_id", nullable = false)
    private Long allocationId;

    /**
     * Many allocations belong to ONE session
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    /**
     * PASS or WALKIN etc.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "allocation_type", nullable = false)
    private SessionAllocationType allocationType;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false)
    private SessionAllocationPaymentStatus paymentStatus;

    /**
     * Only used if allocationType == PASS
     */
    @Column(name = "pass_id", nullable = true)
    private Long passId;

    /**
     * Exact time slice this allocation covers
     */
    @Column(name = "start_at", nullable = false)
    private Instant startAt;

    @Column(name = "end_at", nullable = false)
    private Instant endAt;

    /**
     * Store seconds explicitly for fast reporting
     */
    @Column(name = "seconds", nullable = false)
    private Long seconds;

    /**
     * Optional: used for WALKIN pricing
     */
    @Column(name = "amount_cents", nullable = true)
    private Long amountCents;
}