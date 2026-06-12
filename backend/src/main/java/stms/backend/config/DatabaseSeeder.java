package stms.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import stms.backend.repository.AdminRepository;
import stms.backend.entity.Admin;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public void run(String... args) throws Exception {
        if (adminRepository.count() == 0) {
            Admin defaultAdmin = new Admin();
            defaultAdmin.setUsername("admin");
            defaultAdmin.setPassword("Admin@123"); // Fits frontend regex: uppercase, lowercase, number, special char, min 8
            adminRepository.save(defaultAdmin);
            System.out.println("=========================================");
            System.out.println("DATABASE SEEDING SUCCESSFUL!");
            System.out.println("Default Admin Seeded:");
            System.out.println("Username: admin");
            System.out.println("Password: Admin@123");
            System.out.println("=========================================");
        }
    }
}
