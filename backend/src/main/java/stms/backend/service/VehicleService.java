package stms.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stms.backend.entity.Vehicle;
import stms.backend.repository.VehicleRepository;


@Service
public class VehicleService {
	
	@Autowired
	private VehicleRepository vehicleRepo;

	@Autowired
	private SmsService smsService;
	
	public Vehicle addVehicle(Vehicle vehicle) {
		if(vehicleRepo.findByVehicleNumber(vehicle.getVehicleNumber()).isPresent()) {
			throw new RuntimeException("Vehicle already exists");
		}
		return vehicleRepo.save(vehicle);
	}
	
	public java.util.List<Vehicle> getAllVehicles() {
		return vehicleRepo.findAll();
	}
	
	public Vehicle updateVehicle(Long id, Vehicle vehicleDetails) {
		Vehicle vehicle = vehicleRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
		
		if (!vehicle.getVehicleNumber().equalsIgnoreCase(vehicleDetails.getVehicleNumber())) {
			if (vehicleRepo.findByVehicleNumber(vehicleDetails.getVehicleNumber()).isPresent()) {
				throw new RuntimeException("Vehicle with this number already exists");
			}
		}
		
		vehicle.setVehicleNumber(vehicleDetails.getVehicleNumber());
		vehicle.setVehicleType(vehicleDetails.getVehicleType());
		vehicle.setOwnerName(vehicleDetails.getOwnerName());
		vehicle.setOwnerMobile(vehicleDetails.getOwnerMobile());
		vehicle.setOwnerEmail(vehicleDetails.getOwnerEmail());
		vehicle.setAvailbalance(vehicleDetails.getAvailbalance());
		return vehicleRepo.save(vehicle);
	}
	
	public void deleteVehicle(Long id) {
		Vehicle vehicle = vehicleRepo.findById(id)
				.orElseThrow(() -> new RuntimeException("Vehicle not found with id: " + id));
		vehicleRepo.delete(vehicle);
	}

	public Vehicle chargeVehicle(String vehicleNumber) {
		Vehicle vehicle = vehicleRepo.findByVehicleNumber(vehicleNumber.trim().toUpperCase())
				.orElseThrow(() -> new RuntimeException("Vehicle number " + vehicleNumber + " is not registered"));
		
		double chargeAmount = getChargeAmount(vehicle.getVehicleType());
		
		if (vehicle.getAvailbalance() == null || vehicle.getAvailbalance() < chargeAmount) {
			double currentBalance = vehicle.getAvailbalance() != null ? vehicle.getAvailbalance() : 0.0;
			throw new RuntimeException("Insufficient balance. Required: ₹" + chargeAmount + ", Available: ₹" + currentBalance);
		}
		
		vehicle.setAvailbalance(vehicle.getAvailbalance() - chargeAmount);
		Vehicle savedVehicle = vehicleRepo.save(vehicle);

		try {
			if (savedVehicle.getOwnerMobile() != null && !savedVehicle.getOwnerMobile().trim().isEmpty()) {
				String to = savedVehicle.getOwnerMobile().trim();
				if (!to.startsWith("+")) {
					to = "+91" + to;
				}
				String textMessage = String.format(
					"Dear %s, your vehicle %s has been charged ₹%.2f. Remaining Balance: ₹%.2f.",
					savedVehicle.getOwnerName() != null ? savedVehicle.getOwnerName() : "Owner",
					savedVehicle.getVehicleNumber(),
					chargeAmount,
					savedVehicle.getAvailbalance()
				);
				smsService.sendSms(to, textMessage);
			}
		} catch (Exception e) {
			System.err.println("Failed to send Twilio SMS: " + e.getMessage());
		}

		return savedVehicle;
	}
	
	public double getChargeAmount(String vehicleType) {
		if (vehicleType == null) return 120.0;
		switch (vehicleType.trim()) {
			case "Car": return 120.0;
			case "Truck": return 250.0;
			case "Bus": return 180.0;
			case "LCV": return 100.0;
			case "Two Wheeler": return 50.0;
			default: return 120.0;
		}
	}
}
