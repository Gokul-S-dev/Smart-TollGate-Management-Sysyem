package stms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
import org.springframework.web.bind.annotation.*;


import stms.backend.entity.Vehicle;
import stms.backend.service.VehicleService;

@RestController
@RequestMapping("/api/admin/vehicle")
public class VehicleController {
	
	@Autowired
	private VehicleService vehichleService;
	
	@PostMapping
	public ResponseEntity<?> addVehicle(@RequestBody Vehicle vehicle){
		try {
			return ResponseEntity.ok(vehichleService.addVehicle(vehicle));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
		}
	}

	@GetMapping
	public ResponseEntity<List<Vehicle>> getAllVehicles(){
		return ResponseEntity.ok(vehichleService.getAllVehicles());
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateVehicle(@PathVariable Long id, @RequestBody Vehicle vehicleDetails){
		try {
			return ResponseEntity.ok(vehichleService.updateVehicle(id, vehicleDetails));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteVehicle(@PathVariable Long id){
		try {
			vehichleService.deleteVehicle(id);
			return ResponseEntity.noContent().build();
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
		}
	}

	// Simple local helper class for JSON error responses
	public static class ErrorResponse {
		private String message;
		public ErrorResponse(String message) {
			this.message = message;
		}
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
	}
}
