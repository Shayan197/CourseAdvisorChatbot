import React, { useState } from "react";
import { assets } from "../Assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    reg_no: "",
    first_name: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validate terms and conditions checkbox
    const termsChecked = document.getElementById("terms").checked;
    if (!termsChecked) {
      setError("Please agree to the terms & privacy policy.");
      return;
    }

    // Input validation
    if (!formData.reg_no || !formData.first_name || !formData.password) {
      setError("All fields are required.");
      return;
    }
    if (!/^\d{4}-ARID-\d{4}$/.test(formData.reg_no)) {
      setError("Registration number must follow the format YYYY-ARID-0000.");
      return;
    }
    if (!/^\d{8}$/.test(formData.password)) {
      setError("Password must be exactly 8 digits.");
      return;
    }

    // ✅ Save fake token + role for protected routes
    localStorage.setItem("authToken", "fake-student-token");
    localStorage.setItem("Role", "Student");
    localStorage.setItem("regNo", formData.reg_no);
    localStorage.setItem("firstName", formData.first_name);

    // ✅ Dummy success (no backend)
    setMessage("🎉 You are Successfully Registered!");
    setError("");

    // 2 second baad Dashboard par redirect
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div
      className="h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center">
        <div className="bg-white px-16 py-12 rounded-lg shadow-lg">
          <h1 className="text-2xl font-normal text-customGray text-center mb-6">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Registration No"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
              className="w-96 border-b-2 border-black/50 p-1 outline-none mb-2"
              required
            />
            <br />
            <input
              type="text"
              placeholder="Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-96 border-b-2 border-black/50 p-1 outline-none mb-2"
              required
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-96 border-b-2 border-black/50 p-1 outline-none mb-6"
              required
            />
            <br />
            <button type="submit" className="btn-primary w-96 mb-6">
              Register me
            </button>
          </form>

          {/* Success or Error Messages */}
          {message && (
            <p className="text-green-600 text-center mb-2 font-semibold animate-pulse">
              {message}
            </p>
          )}
          {error && <p className="text-red-600 text-center mb-2">{error}</p>}

          <p className="w-72 text-base text-black/50">
            Already have an account{" "}
            <Link to="/" className="text-customBlue">
              Login here
            </Link>
          </p>

          <div className="w-96 flex items-center mt-3">
            <input type="checkbox" id="terms" />
            <p className="text-base text-black/50 ml-2">
              By continuing, I agree to the terms & privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
