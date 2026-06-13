package stms.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stms.backend.entity.Staff;
import stms.backend.repository.StaffRepository;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff addStaff(Staff staff) {
        if (staffRepository.findByUsername(staff.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        return staffRepository.save(staff);
    }

    public Staff updateStaff(int id, Staff staffDetails) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff member not found with id: " + id));

        staff.setName(staffDetails.getName());
        staff.setEmail(staffDetails.getEmail());
        staff.setMobile(staffDetails.getMobile());
        staff.setShift(staffDetails.getShift());
        
        // Only update username/password if provided/changed
        if (staffDetails.getUsername() != null && !staffDetails.getUsername().trim().isEmpty()) {
            staff.setUsername(staffDetails.getUsername());
        }
        if (staffDetails.getPassword() != null && !staffDetails.getPassword().trim().isEmpty()) {
            staff.setPassword(staffDetails.getPassword());
        }

        return staffRepository.save(staff);
    }

    public void deleteStaff(int id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff member not found with id: " + id));
        staffRepository.delete(staff);
    }
}
