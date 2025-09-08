import React from "react";
import { assets } from "../Assets/assets";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleChangePass = () => {
    localStorage.setItem("authToken", "fake-student-token");
    localStorage.setItem("Role", "Student");
    localStorage.setItem("regNo", "2021-ARID-0000");
    localStorage.setItem("firstName", "Ahmad");
    navigate("/dashboard");
  };

  return (
    <div
      className="h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center">
        {/* responsive box */}
        <div className="bg-white px-6 sm:px-10 md:px-16 py-8 sm:py-10 md:py-12 rounded-lg w-[90%] max-w-lg md:max-w-xl">
          <h1 className="text-xl sm:text-2xl font-normal text-customGray text-center mb-6">
            Change Password
          </h1>

          {/* inputs */}
          <input
            type="password"
            placeholder="New password"
            className="w-full md:w-96 border-b-2 border-black/50 p-1 outline-none mb-4"
          />
          <br />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full md:w-96 border-b-2 border-black/50 p-1 outline-none"
          />
          <br />

          {/* checkbox + terms */}
          <div className="w-full md:w-96 flex my-6 sm:my-9 mx-0">
            <input type="checkbox" />
            <p className="text-sm sm:text-base text-black/50 ml-2">
              I accept the{" "}
              <Link to="" className="text-customBlue">
                Terms and Conditions
              </Link>
            </p>
          </div>

          {/* button */}
          <button
            className="btn-primary w-full md:w-96 mb-4 sm:mb-6"
            onClick={handleChangePass}
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
