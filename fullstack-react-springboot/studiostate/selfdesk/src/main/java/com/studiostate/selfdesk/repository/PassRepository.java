package com.studiostate.selfdesk.repository;


import com.studiostate.selfdesk.entity.Pass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@Repository
public interface PassRepository extends JpaRepository <Pass, Long> {

    List<Pass> findByUserNameContaining(String userName);

    Optional<Pass> findFirstByUserIdAndActiveTrueAndExpiryDateTimeAfterAndRemainingSecondsGreaterThanOrderByExpiryDateTimeAsc(
            Long userId,
            Instant now,
            Long remainingSeconds
    );



}