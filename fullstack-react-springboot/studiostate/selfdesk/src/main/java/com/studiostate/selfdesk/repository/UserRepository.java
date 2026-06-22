package com.studiostate.selfdesk.repository;


import com.studiostate.selfdesk.entity.Session;
import com.studiostate.selfdesk.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository <User, Long> {

    List<User> findByUserNameContaining( String userName);


}