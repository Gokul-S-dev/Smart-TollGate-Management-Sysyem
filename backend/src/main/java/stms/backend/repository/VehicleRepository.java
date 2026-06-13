package stms.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import stms.backend.entity.Vehicle;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle,Long>{
		Optional<Vehicle> findByVehicleNumber(String vehicleNumber);
}
