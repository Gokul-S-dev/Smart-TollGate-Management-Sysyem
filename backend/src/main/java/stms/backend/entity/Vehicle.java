package stms.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="vehicle")
public class Vehicle {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long vehicleId;
	private String vehicleNumber;
	private String vehicleType;
	private String ownerName;
	private String ownerMobile;
	private String ownerEmail;
	private Double availbalance;
	
	public Long getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getOwnerMobile() {
		return ownerMobile;
	}
	public void setOwnerMobile(String ownerMobile) {
		this.ownerMobile = ownerMobile;
	}
	public String getOwnerEmail() {
		return ownerEmail;
	}
	public void setOwnerEmail(String ownerEmail) {
		this.ownerEmail = ownerEmail;
	}
	public Double getAvailbalance() {
		return availbalance;
	}
	public void setAvailbalance(Double availbalance) {
		this.availbalance = availbalance;
	}
	public Vehicle(Long vehicleId, String vehicleNumber, String vehicleType, String ownerName, String ownerMobile, String ownerEmail, Double availbalance) {
		this.vehicleId = vehicleId;
		this.vehicleNumber = vehicleNumber;
		this.vehicleType = vehicleType;
		this.ownerName = ownerName;
		this.ownerMobile = ownerMobile;
		this.ownerEmail = ownerEmail;
		this.availbalance = availbalance;
	}
	public Vehicle(Long vehicleId, String vehicleNumber, String vehicleType, String ownerName, String ownerMobile, String ownerEmail) {
		this.vehicleId = vehicleId;
		this.vehicleNumber = vehicleNumber;
		this.vehicleType = vehicleType;
		this.ownerName = ownerName;
		this.ownerMobile = ownerMobile;
		this.ownerEmail = ownerEmail;
	}
	public Vehicle(Long vehicleId, String vehicleNumber, String vehicleType) {
		this.vehicleId = vehicleId;
		this.vehicleNumber = vehicleNumber;
		this.vehicleType = vehicleType;
	}
	public Vehicle() {
		
	}
	
	
	
	
	
	

}
