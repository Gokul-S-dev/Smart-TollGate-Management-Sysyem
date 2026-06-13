package stms.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stms.backend.dto.LoginRequest;
import stms.backend.dto.LoginResponse;
import stms.backend.entity.Admin;
import stms.backend.entity.Staff;
import stms.backend.repository.AdminRepository;
import stms.backend.repository.StaffRepository;
import stms.backend.security.JwtUtil;

@Service
public class AuthService {
	@Autowired
	private AdminRepository adminrepo;
	
	@Autowired
	private StaffRepository staffRepository;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public LoginResponse login(LoginRequest request) {
		Optional<Admin> adminOpt = adminrepo.findByUsername(request.getUsername());
		if (adminOpt.isPresent()) {
			Admin admin = adminOpt.get();
			if (!admin.getPassword().equals(request.getPassword())) {
				throw new RuntimeException("Invalid password");
			}
			String token = jwtUtil.generateToken(admin.getUsername(), "ADMIN");
			return new LoginResponse(token, admin.getUsername(), "ADMIN");
		}
		
		Optional<Staff> staffOpt = staffRepository.findByUsername(request.getUsername());
		if (staffOpt.isPresent()) {
			Staff staff = staffOpt.get();
			if (!staff.getPassword().equals(request.getPassword())) {
				throw new RuntimeException("Invalid password");
			}
			String token = jwtUtil.generateToken(staff.getUsername(), "STAFF");
			return new LoginResponse(token, staff.getUsername(), "STAFF");
		}
		
		throw new RuntimeException("Invalid username");
	}

}
