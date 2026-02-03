import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, getData } from "./db";
import { useAuth } from "./Auth";

const Update = () => {
  const { id } = useParams();
  const { user, login, logout } = useAuth();
  const [form, setForm] = useState({ 
    firstName: "", 
    middleName: "", 
    lastName: "", 
    age: "", 
    gender: "", 
    email: "", 
    password: "",
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = getData();
    const userData = data.find((u) => u.id === parseInt(id));
    if (userData) {
      setForm({ 
        firstName: userData.firstName, 
        middleName: userData.middleName || "", 
        lastName: userData.lastName, 
        age: userData.age, 
        gender: userData.gender, 
        email: userData.email, 
        password: userData.password,
        confirmPassword: userData.password 
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setSuccess("");
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.age || form.age <= 0) newErrors.age = "Valid age is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    
    // Password validation
    const passwordErrors = [];
    if (form.password.length < 8) {
      passwordErrors.push("At least 8 characters");
    }
    if (!/[a-z]/.test(form.password)) {
      passwordErrors.push("At least one lowercase letter");
    }
    if (!/[A-Z]/.test(form.password)) {
      passwordErrors.push("At least one uppercase letter");
    }
    if (!/[0-9]/.test(form.password)) {
      passwordErrors.push("At least one number");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)) {
      passwordErrors.push("At least one special character");
    }
    
    if (passwordErrors.length > 0) {
      newErrors.password = "Password must contain: " + passwordErrors.join(", ");
    }
    
    // Confirm password validation
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
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
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                  {errors.firstName && (
                    <div className="text-danger">{errors.firstName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="middleName" className="form-label">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="middleName"
                    name="middleName"
                    placeholder="Enter your middle name (optional)"
                    value={form.middleName}
                    onChange={handleChange}
                  />
                  {errors.middleName && (
                    <div className="text-danger">{errors.middleName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={form.age}
                    onChange={handleChange}
                    required
                  />
                  {errors.age && (
                    <div className="text-danger">{errors.age}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <div className="text-danger">{errors.gender}</div>
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
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <div className="text-danger">{errors.confirmPassword}</div>
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
