import { useState } from "react";
import { assets } from "../Assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { users } from "../Assets/data";

const Login = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectUser = (e) => {
    const selectedRegNo = e.target.value;
    if (!selectedRegNo) return;

    const selectedUser = users.find((u) => u.regNo === selectedRegNo);
    if (selectedUser) {
      setRegNo(selectedUser.regNo);
      setPassword(selectedUser.password);
    }
  };

  const handleLogin = () => {
    if (!regNo || !password) {
      setError("Registration number and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      const user = users.find(
        (u) => u.regNo === regNo && u.password === password
      );

      if (user) {
        if (user.role === "Student") {
          localStorage.setItem("authToken", "fake-student-token");
          localStorage.setItem("currentsemesterno", user.currentsemesterno);
          localStorage.setItem("regNo", regNo);
          localStorage.setItem("Role", "Student");
          navigate("/dashboard");
        } else if (user.role === "Admin") {
          localStorage.setItem("authToken", "fake-admin-token");
          localStorage.setItem("Role", "Admin");
          navigate("/admindashboard");
        } else if (user.role === "Advisor") {
          localStorage.setItem("authToken", "fake-advisor-token");
          localStorage.setItem("Emp_No", regNo);
          localStorage.setItem("Emp_firstname", user.Emp_firstname);
          localStorage.setItem("Emp_middle", user.Emp_middle);
          localStorage.setItem("Emp_lastname", user.Emp_lastname);
          localStorage.setItem("Role", "Advisor");
          navigate("/supervisor");
        }
      } else {
        setError("Invalid Registration No or Password.");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="min-h-screen bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex flex-col md:flex-row justify-center items-center md:justify-around p-4">
        {/* Left Side */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-0">
          <img
            src={assets.hero_icon}
            alt="hero_img"
            className="size-24 sm:size-28 md:size-36 mb-4"
          />
          <p className="text-white text-2xl sm:text-3xl md:text-5xl tracking-wider font-semibold">
            CourseAdvisor
          </p>
          <p className="text-white text-2xl sm:text-3xl md:text-5xl tracking-wider font-semibold">
            Chatbot
          </p>
        </div>

        {/* Right Side (Login Box) */}
        <div className="w-full max-w-sm bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-xl">
          <div className="w-full mb-4">
            <p className="font-semibold text-xl sm:text-2xl">Login</p>
          </div>

          {/* 🔹 Dropdown Select */}
          <select
            className="w-full border border-gray-300 p-2 sm:p-3 mb-4 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-customBlue focus:outline-none transition"
            onChange={handleSelectUser}
            defaultValue=""
          >
            <option value="">Select User (Optional)</option>
            {users.map((u, i) => (
              <option key={i} value={u.regNo}>
                {u.role} ({u.regNo})
              </option>
            ))}
          </select>

          {/* Inputs */}
          <input
            type="text"
            required
            placeholder="0000-ARID-0000"
            className="w-full border-b-2 border-black/50 p-2 sm:p-3 outline-none mb-3 text-sm sm:text-base"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full border-b-2 border-black/50 p-2 sm:p-3 outline-none mb-6 text-sm sm:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="btn-primary w-full py-2 sm:py-3 text-sm sm:text-base font-medium rounded-lg transition disabled:opacity-50"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login Now"}
          </button>

          {error && (
            <div className="text-red-500 text-sm mt-3 text-center">{error}</div>
          )}

          {/* Terms */}
          <div className="w-full flex mb-4 items-start mt-4">
            <input type="checkbox" className="mt-1" />
            <p className="text-xs sm:text-sm text-black/60 ml-2 leading-snug">
              Agree to the terms of use & privacy policy
            </p>
          </div>

          {/* Links */}
          <p className="w-full text-xs sm:text-sm text-black/50 mb-2">
            Forget password{" "}
            <Link
              to="/emailverification"
              className="text-customBlue font-medium"
            >
              Click here
            </Link>
          </p>
          <p className="w-full text-xs sm:text-sm text-black/50">
            Create an account{" "}
            <Link to="/signup" className="text-customBlue font-medium">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
