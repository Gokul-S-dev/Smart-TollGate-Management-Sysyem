import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/api";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    password: ""
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  function validateForm() {
    let newErrors = {};

    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!data.name.trim()) {
      newErrors.name = "Username is required";
    } else if (!usernameRegex.test(data.name)) {
      newErrors.name =
        "Username must be 3-15 characters and only use letters, numbers, or underscore";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "Password must have uppercase, lowercase, number, special character, and minimum 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      try{
        const res = await API.post("/api/auth/login",{
          username: data.name,
          password: data.password
        });

        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.role);
        localStorage.setItem("username",res.data.username);

        alert("Login successful");
        if (res.data.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/toll-staff");
        }

      }catch(err){
        alert("Invalidate username or password");
        console.log(err.message);
      }

    }


  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{ width: "100%", maxWidth: "430px" }}
      >
        <div className="text-center mb-4">
          <div
            className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{ width: "65px", height: "65px", fontSize: "28px" }}
          >
            🔐
          </div>

          <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
          <p className="text-muted mb-0">
            Login to access your toll management dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>

            <input
              type="text"
              className={`form-control form-control-lg ${
                errors.name ? "is-invalid" : data.name ? "is-valid" : ""
              }`}
              placeholder="Enter username"
              value={data.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
            />

            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>

            <div className="input-group input-group-lg">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.password
                    ? "is-invalid"
                    : data.password
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Enter password"
                value={data.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                  setErrors({ ...errors, password: "" });
                }}
              />

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />
              <label className="form-check-label text-muted" htmlFor="remember">
                Remember me
              </label>
            </div>

            <a href="#" className="text-decoration-none fw-semibold">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Login
          </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
          Do not have an account?{" "}
          <a href="#" className="text-decoration-none fw-bold">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;