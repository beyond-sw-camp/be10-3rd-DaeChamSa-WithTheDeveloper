package com.developer.user.command.domain.repository;

import com.developer.user.command.domain.aggregate.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserId(String userId);

    Optional<User> findByUserNick(String userNick);

    Optional<User> findByUserPhone(String userPhone);

    Optional<User> findByUserCode(Long userCode);

    // 아이디가 이미 있는지 확인
    boolean existsByUserId(String userId);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.userCode = :userCode AND (u.userStatus = 'BAN' OR u.userStatus = 'DELETE')")
    boolean findUserByUserStatusBANORDELETE(@Param("userCode") Long userCode);
}
