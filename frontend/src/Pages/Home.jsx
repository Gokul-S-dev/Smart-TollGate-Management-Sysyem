import { useNavigate } from "react-router-dom";
import "../Style/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 bg-light">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">
            🚦 Smart Tollgate
          </span>

          <button
            className="btn btn-light fw-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="container py-5">
        <div className="row align-items-center min-vh-75">
          <div className="col-md-6">
            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
              Smart Transport Solution
            </span>

            <h1 className="display-5 fw-bold text-dark mb-3">
              Smart Tollgate Management System
            </h1>

            <p className="lead text-muted mb-4">
              Automating toll collection, vehicle tracking, and traffic flow
              with real-time intelligent systems.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <button
                className="btn btn-primary btn-lg px-4"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>

              <button className="btn btn-outline-primary btn-lg px-4">
                Learn More
              </button>
            </div>
          </div>

          {/* MOVING CAR SECTION */}
          <div className="col-md-6 mt-5 mt-md-0">
            <div className="card border-0 shadow-lg rounded-4 p-4 bg-white">
              <div className="text-center mb-4">
                <h3 className="fw-bold text-primary">
                  Real-Time Toll Processing
                </h3>
                <p className="text-muted">
                  Vehicles move through the tollgate with faster processing.
                </p>
              </div>

              <div className="road-box">
                <div className="toll-gate">
                  <div className="gate-bar"></div>
                  <div className="gate-post"></div>
                </div>

                <div className="road-line"></div>

                <div className="moving-car">🚗</div>
              </div>

              <div className="mt-4 text-center">
                <span className="badge bg-success-subtle text-success px-3 py-2">
                  Live System Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-primary text-white py-5 mt-4">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <h2 className="fw-bold">500+</h2>
              <p className="mb-0">Vehicles Processed</p>
            </div>

            <div className="col-md-4">
              <h2 className="fw-bold">24/7</h2>
              <p className="mb-0">Monitoring System</p>
            </div>

            <div className="col-md-4">
              <h2 className="fw-bold">₹50K+</h2>
              <p className="mb-0">Revenue Tracked</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">
          © 2026 Smart Tollgate System | Built with React
        </p>
      </footer>
    </div>
  );
};

export default Home;