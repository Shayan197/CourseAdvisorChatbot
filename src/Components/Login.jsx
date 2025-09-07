import { useState } from "react";
import { assets } from "../Assets/assets";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //For button state
  const navigate = useNavigate();

  const users = [
    {
      regNo: "21-ARID-0000",
      password: "00000",
      role: "Student",
      currentsemesterno: 5,
    },
    { regNo: "adminNo", password: "admin123", role: "Admin" },
    {
      regNo: "advisorNo",
      password: "advisor123",
      role: "Advisor",
      Emp_firstname: "Muhammad",
      Emp_middle: "Jamil",
      Emp_lastname: "Sawar",
    },
  ];

  const handleLogin = () => {
    if (!regNo || !password) {
      setError("Registration number and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      // Hard-code check
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
      className="h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80">
        <div className="h-full mx-auto flex justify-around items-center">
          <div className="flex-col justify-center">
            <div className="flex justify-center mb-5">
              <img src={assets.hero_icon} alt="hero_img" className="size-36" />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-white text-5xl tracking-wider mb-2 font-medium">
                CourseAdvisor
              </p>
              <p className="text-white text-5xl tracking-wider font-medium">
                Chatbot
              </p>
            </div>
          </div>

          <div className="w-[370px] h-[420px] bg-white rounded-xl flex flex-col items-center justify-center">
            <div className="w-72">
              <p className="font-medium text-2xl mb-6">Login</p>
            </div>
            <input
              type="text"
              required
              placeholder="0000-ARID-0000"
              className="w-72 border-b-2 border-black/50 p-1 outline-none mb-2"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-72 border-b-2 border-black/50 p-1 outline-none mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn-primary mb-8"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login Now"}
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="w-72 flex mb-6">
              <input type="checkbox" />
              <p className="text-xs text-black/50 ml-2">
                Agree to the terms of use & privacy policy
              </p>
            </div>
            <p className="w-72 text-xs text-black/50 mb-2">
              Forget password{" "}
              <Link
                to="/emailverification"
                className="text-customBlue text-[15px]"
              >
                Click here
              </Link>
            </p>
            <p className="w-72 text-xs text-black/50">
              Create an accouont{" "}
              <Link to="/signup" className="text-customBlue text-[15px]">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
