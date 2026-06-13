import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/api";

function TollStaff() {
  const navigate = useNavigate();
  const staffName = localStorage.getItem("username") || "Staff Member";

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [history, setHistory] = useState([]);

  const handleCharge = async (e) => {
    e.preventDefault();

    const vehicleRegex = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;

    if (vehicleNumber.trim() === "") {
      setError("Vehicle number is required");
      setSuccess("");
      return;
    }

    if (!vehicleRegex.test(vehicleNumber)) {
      setError("Enter valid vehicle number. Example: TN37AB1234");
      setSuccess("");
      return;
    }

    try {
      const response = await API.post("/api/staff/vehicle/charge", {
        vehicleNumber: vehicleNumber
      });

      const { amountCharged, remainingBalance, ownerName } = response.data;

      const newHistory = {
        id: Date.now(),
        vehicleNumber: vehicleNumber,
        amount: amountCharged,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      };

      setHistory([newHistory, ...history]);
      setError("");
      setSuccess(`Vehicle ${vehicleNumber} (Owner: ${ownerName}) charged successfully ₹${amountCharged}! Remaining Balance: ₹${remainingBalance.toFixed(2)}`);
      setVehicleNumber("");
    } catch (err) {
      console.error("Charging error:", err);
      const errMsg = err.response?.data?.message || "Failed to charge vehicle";
      setError(errMsg);
      setSuccess("");
    }
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center g-4">

          {/* Toll Charge Card */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="fw-bold text-primary mb-1">
                    Toll Staff Panel
                  </h2>
                  <p className="text-muted mb-0">Welcome, {staffName}</p>
                </div>

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>

              <form onSubmit={handleCharge}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Vehicle Number
                  </label>

                  <input
                    type="text"
                    className={`form-control form-control-lg ${
                      error ? "is-invalid" : vehicleNumber ? "is-valid" : ""
                    }`}
                    value={vehicleNumber}
                    onChange={(e) =>
                      setVehicleNumber(
                        e.target.value.toUpperCase().replace(/\s/g, "")
                      )
                    }
                    placeholder="Example: TN37AB1234"
                    maxLength="10"
                  />

                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                {success && (
                  <div className="alert alert-success py-2" role="alert">
                    {success}
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-lg w-100">
                  Process Toll Charge
                </button>
              </form>

              <div className="mt-4 p-3 bg-light rounded-3 border">
                <p className="mb-1 fw-semibold">Valid Format:</p>
                <small className="text-muted">
                  TN37AB1234, KA05MN4567, MH12D1234
                </small>
              </div>
            </div>
          </div>

          {/* History Section */}
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4 p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="fw-bold mb-1">
                    <i className="bi bi-clock-history me-2 text-primary"></i>
                    Charge History
                  </h3>
                  <p className="text-muted mb-0">
                    Recent charged vehicles
                  </p>
                </div>

                {history.length > 0 && (
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={clearHistory}
                  >
                    Clear
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="text-muted mt-3 mb-0">
                    No vehicle charged yet
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Vehicle No</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Time</th>
                      </tr>
                    </thead>

                    <tbody>
                      {history.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <span className="badge text-bg-primary">
                              {item.vehicleNumber}
                            </span>
                          </td>
                          <td>₹{item.amount}</td>
                          <td>{item.date}</td>
                          <td>{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TollStaff;