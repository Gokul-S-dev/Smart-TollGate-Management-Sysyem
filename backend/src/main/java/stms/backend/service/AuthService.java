package stms.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stms.backend.dto.LoginRequest;
import stms.backend.dto.LoginResponse;
import stms.backend.entity.Admin;
import stms.backend.repository.AdminRepository;
import stms.backend.security.JwtUtil;

@Service
public class AuthService {
	@Autowired
	private AdminRepository adminrepo ;
	@Autowired
	private JwtUtil jwtUtil;
	
	public LoginResponse login(LoginRequest request) {
		
		   Admin admin = adminrepo.findByUsername(request.getUsername())
	                .orElseThrow(() -> new RuntimeException("Invalid username"));
		   
		   if(!admin.getPassword().equals(request.getPassword())) {
			   throw new RuntimeException("Invalid password");
		   }
		   String token = jwtUtil.generateToken(admin.getUsername(), "ADMIN");
		   
		
		return new LoginResponse(token, admin.getUsername(),"ADMIN");
		
	}

}
