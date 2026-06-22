package com.studiostate.selfdesk.repository;

import com.studiostate.selfdesk.entity.Product;
import com.studiostate.selfdesk.entity.Session;
import com.studiostate.selfdesk.entity.SessionAllocationPaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;


@Repository
public interface SessionRepository extends JpaRepository <Session, Long> {


    List<Session> findByUserId(Long userId);
    List<Session> findByUserIdAndOpenTrue(Long userId);
    List<Session> findByOpenTrueOrCheckInAtAfter(Instant todayStart);

    @Query("""
    SELECT s
    FROM Session s
    WHERE s.userId = :userId
      AND EXISTS (
          SELECT a
          FROM SessionAllocation a
          WHERE a.session = s
            AND a.paymentStatus = :status
      )
""")
    List<Session> findSessionsWithOpenAllocations(
            @Param("userId") Long userId,
            @Param("status") SessionAllocationPaymentStatus status
    );


}