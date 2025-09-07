import React from "react";
import { assets } from "../Assets/assets";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const nevigate = useNavigate();
  const handleChangePass = () => {
    localStorage.setItem("authToken", "fake-student-token");
    localStorage.setItem("Role", "Student");
    localStorage.setItem("regNo", "2021-ARID-0000");
    localStorage.setItem("firstName", "Ahmad");
    nevigate("/dashboard");
  };
  return (
    <div
      className="h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center">
        <div className="bg-white px-16 py-12 rounded-lg">
          <h1 className="text-2xl font-normal text-customGray text-center mb-6">
            Change Password
          </h1>
          <input
            type="text"
            placeholder="New passward"
            className="w-96 border-b-2 border-black/50 p-1 outline-none mb-4"
          />
          <br />
          <input
            type="text"
            placeholder="Confirm password"
            className="w-96 border-b-2 border-black/50 p-1 outline-none"
          />
          <br />
          <div className="w-96 flex my-9 mx-0">
            <input type="checkbox" />
            <p className="text-base text-black/50 ml-2">
              I accept the{" "}
              <Link to="/login" className="text-customBlue">
                Terms and Conditions
              </Link>
            </p>
          </div>
          <button className="btn-primary w-96 mb-6" onClick={handleChangePass}>
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
