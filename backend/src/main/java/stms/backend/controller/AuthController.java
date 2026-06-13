package stms.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import stms.backend.dto.LoginRequest;
import stms.backend.dto.LoginResponse;
import stms.backend.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/auth/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request){
		return ResponseEntity.ok(authService.login(request));
	}
	
	@GetMapping("/admin/dashboard")
	public String dasboard() {
		return "Welcome Admin Dashboard";
	}

}
