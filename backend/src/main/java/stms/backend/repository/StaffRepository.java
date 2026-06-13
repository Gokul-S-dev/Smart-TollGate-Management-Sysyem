package stms.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import stms.backend.entity.Staff;

public interface StaffRepository extends JpaRepository<Staff, Integer> {
    Optional<Staff> findByUsername(String username);
}
