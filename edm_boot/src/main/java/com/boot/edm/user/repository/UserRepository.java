package com.boot.edm.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.edm.user.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{

	Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByEmail(String email);
}
