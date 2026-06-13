import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../Api/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard"); // "dashboard" | "staff"
  const [staffList, setStaffList] = useState([]);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    mobile: "",
    shift: "Morning"
  });
  const [formError, setFormError] = useState("");

  const [vehicleList, setVehicleList] = useState([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleFormData, setVehicleFormData] = useState({
    vehicleNumber: "",
    vehicleType: "Car",
    ownerName: "",
    ownerMobile: "",
    ownerEmail: "",
    availbalance: ""
  });
  const [vehicleFormError, setVehicleFormError] = useState("");

  const transactions = [
    {
      id: 1,
      vehicleNo: "TN37AB1234",
      type: "Car",
      amount: 120,
      status: "Paid",
      time: "10:30 AM"
    },
    {
      id: 2,
      vehicleNo: "KA05MN4567",
      type: "Truck",
      amount: 250,
      status: "Paid",
      time: "11:10 AM"
    },
    {
      id: 3,
      vehicleNo: "MH12DE9876",
      type: "Bus",
      amount: 180,
      status: "Pending",
      time: "11:45 AM"
    }
  ];

  // Fetch Staff
  const fetchStaff = async () => {
    try {
      const res = await API.get("/api/admin/staff");
      setStaffList(res.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/api/admin/vehicle");
      setVehicleList(res.data);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    }
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      try {
        // Simple verification request
        await API.get("/api/admin/dashboard");
        fetchStaff();
        fetchVehicles();
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    checkAuthAndFetch();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleOpenAddModal = () => {
    setEditingStaff(null);
    setFormData({
      name: "",
      username: "",
      password: "",
      email: "",
      mobile: "",
      shift: "Morning"
    });
    setFormError("");
    setShowModal(true);
  };

  const handleOpenEditModal = (staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      username: staff.username,
      password: "", // Keep empty unless updating password
      email: staff.email || "",
      mobile: staff.mobile || "",
      shift: staff.shift || "Morning"
    });
    setFormError("");
    setShowModal(true);
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await API.delete(`/api/admin/staff/${id}`);
        fetchStaff();
      } catch (err) {
        console.error("Error deleting staff:", err);
        alert("Failed to delete staff member");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.username.trim()) {
      setFormError("Name and Username are required");
      return;
    }
    
    if (!editingStaff && !formData.password.trim()) {
      setFormError("Password is required for new staff");
      return;
    }

    try {
      if (editingStaff) {
        await API.put(`/api/admin/staff/${editingStaff.id}`, formData);
      } else {
        await API.post("/api/admin/staff", formData);
      }
      fetchStaff();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving staff:", err);
      setFormError(err.response?.data?.message || "Failed to save staff member details. Check if username is unique.");
    }
  };

  const handleOpenAddVehicleModal = () => {
    setEditingVehicle(null);
    setVehicleFormData({
      vehicleNumber: "",
      vehicleType: "Car",
      ownerName: "",
      ownerMobile: "",
      ownerEmail: "",
      availbalance: ""
    });
    setVehicleFormError("");
    setShowVehicleModal(true);
  };

  const handleOpenEditVehicleModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleFormData({
      vehicleNumber: vehicle.vehicleNumber,
      vehicleType: vehicle.vehicleType,
      ownerName: vehicle.ownerName || "",
      ownerMobile: vehicle.ownerMobile || "",
      ownerEmail: vehicle.ownerEmail || "",
      availbalance: vehicle.availbalance !== undefined && vehicle.availbalance !== null ? vehicle.availbalance.toString() : "0"
    });
    setVehicleFormError("");
    setShowVehicleModal(true);
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await API.delete(`/api/admin/vehicle/${id}`);
        fetchVehicles();
      } catch (err) {
        console.error("Error deleting vehicle:", err);
        alert("Failed to delete vehicle");
      }
    }
  };

  const handleVehicleFormSubmit = async (e) => {
    e.preventDefault();
    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    const mobileRegex = /^[0-9]{10}$/;
    
    if (!vehicleFormData.vehicleNumber.trim()) {
      setVehicleFormError("Vehicle number is required");
      return;
    }

    if (!vehicleRegex.test(vehicleFormData.vehicleNumber)) {
      setVehicleFormError("Enter valid vehicle number. Example: TN37AB1234");
      return;
    }

    if (!vehicleFormData.ownerName.trim()) {
      setVehicleFormError("Owner name is required");
      return;
    }

    if (!vehicleFormData.ownerMobile.trim()) {
      setVehicleFormError("Owner contact mobile number is required");
      return;
    }

    if (!mobileRegex.test(vehicleFormData.ownerMobile)) {
      setVehicleFormError("Enter valid 10-digit mobile number");
      return;
    }

    if (vehicleFormData.availbalance === "" || isNaN(vehicleFormData.availbalance) || parseFloat(vehicleFormData.availbalance) < 0) {
      setVehicleFormError("Available balance must be a positive number");
      return;
    }

    const payload = {
      ...vehicleFormData,
      availbalance: parseFloat(vehicleFormData.availbalance)
    };

    try {
      if (editingVehicle) {
        await API.put(`/api/admin/vehicle/${editingVehicle.vehicleId}`, payload);
      } else {
        await API.post("/api/admin/vehicle", payload);
      }
      fetchVehicles();
      setShowVehicleModal(false);
    } catch (err) {
      console.error("Error saving vehicle:", err);
      setVehicleFormError(err.response?.data?.message || "Failed to save vehicle details. Check if vehicle number is unique.");
    }
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* TOP NAVBAR */}
      <nav className="navbar navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4">
            🚦 Smart Tollgate Admin
          </span>

          <button
            className="btn btn-light fw-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR */}
          <div className="col-md-2 bg-dark text-white min-vh-100 p-3">
            <h5 className="fw-bold mb-4">Admin Panel</h5>

            <ul className="nav flex-column gap-2">
              <li className="nav-item">
                <button
                  className={`btn w-100 text-start ${activeTab === "dashboard" ? "btn-primary" : "btn-dark"}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  📊 Dashboard
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn w-100 text-start ${activeTab === "staff" ? "btn-primary" : "btn-dark"}`}
                  onClick={() => setActiveTab("staff")}
                >
                  👨‍💼 Staff
                </button>
              </li>

              <li className="nav-item">
                <button
                  className={`btn w-100 text-start ${activeTab === "vehicles" ? "btn-primary" : "btn-dark"}`}
                  onClick={() => setActiveTab("vehicles")}
                >
                  🚗 Vehicles
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark w-100 text-start" disabled>
                  💳 Payments
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark w-100 text-start" disabled>
                  📄 Reports
                </button>
              </li>
            </ul>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-10 p-4">
            {activeTab === "dashboard" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-1">Dashboard Overview</h2>
                    <p className="text-muted mb-0">
                      Monitor tollgate activity and transactions
                    </p>
                  </div>

                  <button className="btn btn-primary">
                    Generate Report
                  </button>
                </div>

                {/* STATS CARDS */}
                <div className="row g-4 mb-4">
                  <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 cursor-pointer" onClick={() => setActiveTab("vehicles")}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Total Vehicles</p>
                          <h3 className="fw-bold mb-0">{vehicleList.length}</h3>
                        </div>
                        <div className="fs-1">🚗</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Today Revenue</p>
                          <h3 className="fw-bold mb-0">₹18,400</h3>
                        </div>
                        <div className="fs-1">💰</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3 cursor-pointer" onClick={() => setActiveTab("staff")}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Active Staff</p>
                          <h3 className="fw-bold mb-0">{staffList.length}</h3>
                        </div>
                        <div className="fs-1">👨‍💼</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="card border-0 shadow-sm rounded-4 p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">Pending Payments</p>
                          <h3 className="fw-bold mb-0">3</h3>
                        </div>
                        <div className="fs-1">⏳</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CONTENT ROW */}
                <div className="row g-4">
                  {/* TRANSACTION TABLE */}
                  <div className="col-md-8">
                    <div className="card border-0 shadow-sm rounded-4">
                      <div className="card-header bg-white border-0 p-3">
                        <h5 className="fw-bold mb-0">
                          Recent Transactions
                        </h5>
                      </div>

                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-hover align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>#</th>
                                <th>Vehicle No</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Time</th>
                              </tr>
                            </thead>

                            <tbody>
                              {transactions.map((item, index) => (
                                <tr key={item.id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    <span className="badge text-bg-primary">
                                      {item.vehicleNo}
                                    </span>
                                  </td>
                                  <td>{item.type}</td>
                                  <td>₹{item.amount}</td>
                                  <td>
                                    <span
                                      className={`badge ${
                                        item.status === "Paid"
                                          ? "text-bg-success"
                                          : "text-bg-warning"
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                  </td>
                                  <td>{item.time}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="col-md-4">
                    <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
                      <h5 className="fw-bold mb-3">Quick Actions</h5>

                      <div className="d-grid gap-2">
                        <button className="btn btn-outline-primary text-start" onClick={() => { setActiveTab("staff"); handleOpenAddModal(); }}>
                          👤 Add Staff
                        </button>

                        <button className="btn btn-outline-warning text-start" onClick={() => { setActiveTab("vehicles"); handleOpenAddVehicleModal(); }}>
                          🚗 Add Vehicle
                        </button>

                        <button className="btn btn-outline-success text-start" disabled>
                          💳 View Payments
                        </button>

                        <button className="btn btn-outline-danger text-start" disabled>
                          🚨 Emergency Stop
                        </button>
                      </div>
                    </div>

                    <div className="card border-0 shadow-sm rounded-4 p-3">
                      <h5 className="fw-bold mb-3">System Status</h5>

                      <div className="d-flex justify-content-between mb-2">
                        <span>Camera Detection</span>
                        <span className="badge text-bg-success">Active</span>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span>Payment Gateway</span>
                        <span className="badge text-bg-success">Online</span>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <span>Toll Gate</span>
                        <span className="badge text-bg-success">Open</span>
                      </div>

                      <div className="d-flex justify-content-between">
                        <span>Server</span>
                        <span className="badge text-bg-success">Running</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "staff" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-1">Staff Management</h2>
                    <p className="text-muted mb-0">
                      Manage shift operators and toll collectors
                    </p>
                  </div>

                  <button className="btn btn-primary px-4 fw-semibold shadow-sm" onClick={handleOpenAddModal}>
                    ➕ Add Staff
                  </button>
                </div>

                {/* STAFF LIST TABLE CARD */}
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-3">
                    <h5 className="fw-bold mb-0">Active Operators</h5>
                  </div>

                  <div className="card-body">
                    {staffList.length === 0 ? (
                      <div className="text-center py-5 text-muted">
                        <p className="mb-0 fs-5">No staff members registered yet</p>
                        <button className="btn btn-sm btn-outline-primary mt-3 px-4" onClick={handleOpenAddModal}>
                          Add First Member
                        </button>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover align-middle">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Mobile</th>
                              <th>Shift</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {staffList.map((staff, index) => (
                              <tr key={staff.id}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="fw-semibold text-dark">{staff.name}</div>
                                </td>
                                <td>
                                  <span className="badge text-bg-secondary">{staff.username}</span>
                                </td>
                                <td>{staff.email || "—"}</td>
                                <td>{staff.mobile || "—"}</td>
                                <td>
                                  <span className={`badge ${
                                    staff.shift === "Morning" ? "text-bg-success" :
                                    staff.shift === "Evening" ? "text-bg-warning" : "text-bg-info"
                                  }`}>
                                    {staff.shift || "Morning"}
                                  </span>
                                </td>
                                <td className="text-end">
                                  <button
                                    className="btn btn-sm btn-outline-primary me-2 px-3"
                                    onClick={() => handleOpenEditModal(staff)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger px-3"
                                    onClick={() => handleDeleteStaff(staff.id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "vehicles" && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-1">Vehicle Management</h2>
                    <p className="text-muted mb-0">
                      Manage registered vehicles and vehicle types
                    </p>
                  </div>

                  <button className="btn btn-primary px-4 fw-semibold shadow-sm" onClick={handleOpenAddVehicleModal}>
                    ➕ Add Vehicle
                  </button>
                </div>

                {/* VEHICLE LIST TABLE CARD */}
                <div className="card border-0 shadow-sm rounded-4">
                  <div className="card-header bg-white border-0 p-3">
                    <h5 className="fw-bold mb-0">Registered Vehicles</h5>
                  </div>

                  <div className="card-body">
                    {vehicleList.length === 0 ? (
                      <div className="text-center py-5 text-muted">
                        <p className="mb-0 fs-5">No vehicles registered yet</p>
                        <button className="btn btn-sm btn-outline-primary mt-3 px-4" onClick={handleOpenAddVehicleModal}>
                          Add First Vehicle
                        </button>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover align-middle">
                          <thead className="table-light">
                            <tr>
                              <th>#</th>
                              <th>Vehicle ID</th>
                              <th>Vehicle Number</th>
                              <th>Vehicle Type</th>
                              <th>Owner Name</th>
                              <th>Owner Contact</th>
                              <th>Owner Email</th>
                              <th>Available Balance</th>
                              <th className="text-end">Actions</th>
                            </tr>
                          </thead>

                          <tbody>
                            {vehicleList.map((vehicle, index) => (
                              <tr key={vehicle.vehicleId}>
                                <td>{index + 1}</td>
                                <td>{vehicle.vehicleId}</td>
                                <td>
                                  <span className="badge text-bg-primary">{vehicle.vehicleNumber}</span>
                                </td>
                                <td>
                                  <span className={`badge ${
                                    vehicle.vehicleType === "Car" ? "text-bg-success" :
                                    vehicle.vehicleType === "Truck" ? "text-bg-danger" :
                                    vehicle.vehicleType === "Bus" ? "text-bg-warning" : "text-bg-info"
                                  }`}>
                                    {vehicle.vehicleType}
                                  </span>
                                </td>
                                <td className="fw-semibold">{vehicle.ownerName || "—"}</td>
                                <td>{vehicle.ownerMobile || "—"}</td>
                                <td>{vehicle.ownerEmail || "—"}</td>
                                <td className="fw-bold text-success">
                                  ₹{vehicle.availbalance != null ? vehicle.availbalance.toFixed(2) : "0.00"}
                                </td>
                                <td className="text-end">
                                  <button
                                    className="btn btn-sm btn-outline-primary me-2 px-3"
                                    onClick={() => handleOpenEditVehicleModal(vehicle)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="btn btn-sm btn-outline-danger px-3"
                                    onClick={() => handleDeleteVehicle(vehicle.vehicleId)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* END MAIN */}
        </div>
      </div>

      {/* ADD/EDIT MODAL OVERLAY */}
      {showModal && (
        <div className="modal show d-block animate-fade-in" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 bg-light rounded-top-4 p-3">
                <h5 className="modal-title fw-bold text-dark">
                  {editingStaff ? "✏️ Edit Staff Details" : "👤 Add New Staff"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="modal-body p-4">
                  {formError && (
                    <div className="alert alert-danger py-2" role="alert">
                      {formError}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Username</label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="e.g. johndoe"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password {editingStaff && <small className="text-muted">(Leave empty to keep current)</small>}
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={editingStaff ? "New password (optional)" : "Enter password"}
                      required={!editingStaff}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email Address</label>
                    <input
                      type="email"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Assign Shift</label>
                    <select
                      className="form-select form-select-lg border-2 rounded-3"
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    >
                      <option value="Morning">Morning Shift</option>
                      <option value="Evening">Evening Shift</option>
                      <option value="Night">Night Shift</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0 p-3 bg-light rounded-bottom-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2 fw-semibold"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold shadow-sm">
                    {editingStaff ? "Update Details" : "Add Staff"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ADD/EDIT VEHICLE MODAL OVERLAY */}
      {showVehicleModal && (
        <div className="modal show d-block animate-fade-in" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header border-0 bg-light rounded-top-4 p-3">
                <h5 className="modal-title fw-bold text-dark">
                  {editingVehicle ? "✏️ Edit Vehicle Details" : "🚗 Add New Vehicle"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowVehicleModal(false)}
                ></button>
              </div>
              <form onSubmit={handleVehicleFormSubmit}>
                <div className="modal-body p-4">
                  {vehicleFormError && (
                    <div className="alert alert-danger py-2" role="alert">
                      {vehicleFormError}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Vehicle Number</label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 rounded-3 text-uppercase"
                      value={vehicleFormData.vehicleNumber}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicleNumber: e.target.value.toUpperCase().replace(/\s/g, "") })}
                      placeholder="e.g. TN37AB1234"
                      maxLength="10"
                      required
                    />
                    <small className="text-muted mt-1 d-block">
                      Valid format: TN37AB1234, KA05MN4567, MH12D1234
                    </small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Vehicle Type</label>
                    <select
                      className="form-select form-select-lg border-2 rounded-3"
                      value={vehicleFormData.vehicleType}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, vehicleType: e.target.value })}
                    >
                      <option value="Car">Car</option>
                      <option value="Truck">Truck</option>
                      <option value="Bus">Bus</option>
                      <option value="LCV">LCV</option>
                      <option value="Two Wheeler">Two Wheeler</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Owner Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={vehicleFormData.ownerName}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, ownerName: e.target.value })}
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Owner Mobile</label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={vehicleFormData.ownerMobile}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, ownerMobile: e.target.value.replace(/\D/g, "") })}
                      placeholder="e.g. 9876543210"
                      maxLength="10"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Owner Email</label>
                    <input
                      type="email"
                      className="form-control form-control-lg border-2 rounded-3"
                      value={vehicleFormData.ownerEmail}
                      onChange={(e) => setVehicleFormData({ ...vehicleFormData, ownerEmail: e.target.value })}
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Available Balance</label>
                    <div className="input-group">
                      <span className="input-group-text fw-bold">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control form-control-lg border-2 rounded-end-3"
                        value={vehicleFormData.availbalance}
                        onChange={(e) => setVehicleFormData({ ...vehicleFormData, availbalance: e.target.value })}
                        placeholder="e.g. 500.00"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 p-3 bg-light rounded-bottom-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 py-2 fw-semibold"
                    onClick={() => setShowVehicleModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary px-4 py-2 fw-semibold shadow-sm">
                    {editingVehicle ? "Update Details" : "Add Vehicle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;