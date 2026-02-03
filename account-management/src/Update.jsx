import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getData } from "./db";
import { useAuth } from "./Auth";

const Update = () => {
  const { id } = useParams(); // Assuming ID is passed via route params
  const { user, login, logout } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData();
    const user = data.find((u) => u.id === parseInt(id));
    if (user) {
      setForm({ name: user.name, email: user.email, password: user.password });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleLogout = () => {
    setSuccess("Logout successful! Redirecting...");
    logout();
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    updateUser(parseInt(id), form);
    // Update the context user state
    login({ ...user, ...form });
    setSuccess("Update successful!");
    setTimeout(() => setSuccess(""), 3000); // Clear success message after 3 seconds
  };

  return (
    <div className="container mt-5 bg-dark">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Update User</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <div className="text-danger">{errors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                {success && (
                  <div className="alert alert-success">{success}</div>
                )}

                <div className="d-flex justify-content-between">
                  <button className="btn btn-danger w-50 m-1" onClick={handleLogout}>
                    Logout
                  </button>
                    <button type="submit" className="btn btn-primary w-50 m-1" onClick={handleSubmit}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
