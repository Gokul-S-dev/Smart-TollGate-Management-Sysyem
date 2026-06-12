package stms.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import stms.backend.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

	Optional<Admin> findByUsername(String username);

}
