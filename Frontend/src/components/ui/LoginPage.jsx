import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPages.css";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Seller",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch(
        "https://e-commerce-app-jtd-y1b1.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save the returned user data in localStorage
        localStorage.setItem("user", JSON.stringify(data));

        console.log("Login successful:", data);
        if (data.role === "Seller") {
          navigate("/sellermain"); // Navigate to orders if user is a seller
        } else {
          navigate("/maincomponent"); // Default navigation for other users
        } // Redirect to dashboard
      } else {
        alert(
          data.message || "Invalid Email or Password or Role, please try again!"
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Seller">Seller</option>
              <option value="User">User</option>
            </select>
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="auth-link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
