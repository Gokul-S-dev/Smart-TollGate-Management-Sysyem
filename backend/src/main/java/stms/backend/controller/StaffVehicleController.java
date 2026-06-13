package stms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import stms.backend.entity.Vehicle;
import stms.backend.service.VehicleService;

import java.util.Map;

@RestController
@RequestMapping("/api/staff/vehicle")
public class StaffVehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping("/charge")
    public ResponseEntity<?> chargeVehicle(@RequestBody Map<String, String> request) {
        String vehicleNumber = request.get("vehicleNumber");
        if (vehicleNumber == null || vehicleNumber.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Vehicle number is required"));
        }
        try {
            Vehicle chargedVehicle = vehicleService.chargeVehicle(vehicleNumber);
            double chargedAmount = vehicleService.getChargeAmount(chargedVehicle.getVehicleType());
            return ResponseEntity.ok(Map.of(
                "vehicleNumber", chargedVehicle.getVehicleNumber(),
                "vehicleType", chargedVehicle.getVehicleType(),
                "amountCharged", chargedAmount,
                "remainingBalance", chargedVehicle.getAvailbalance(),
                "ownerName", chargedVehicle.getOwnerName() != null ? chargedVehicle.getOwnerName() : "Unknown",
                "message", "Vehicle charged successfully!"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
