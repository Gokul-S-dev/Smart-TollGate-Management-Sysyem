import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

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
            onClick={() => navigate("/")}
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
                <button className="btn btn-primary w-100 text-start">
                  📊 Dashboard
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark w-100 text-start">
                  🚗 Vehicles
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark w-100 text-start">
                  💳 Payments
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark w-100 text-start">
                  👨‍💼 Staff
                </button>
              </li>

              <li className="nav-item">
                <button className="btn btn-dark w-100 text-start">
                  📄 Reports
                </button>
              </li>
            </ul>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-10 p-4">
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
                <div className="card border-0 shadow-sm rounded-4 p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1">Total Vehicles</p>
                      <h3 className="fw-bold mb-0">520</h3>
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
                <div className="card border-0 shadow-sm rounded-4 p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="text-muted mb-1">Active Staff</p>
                      <h3 className="fw-bold mb-0">8</h3>
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
                    <button className="btn btn-outline-primary">
                      Add Staff
                    </button>

                    <button className="btn btn-outline-success">
                      View Payments
                    </button>

                    <button className="btn btn-outline-warning">
                      Pending Vehicles
                    </button>

                    <button className="btn btn-outline-danger">
                      Emergency Stop
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
          {/* END MAIN */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;