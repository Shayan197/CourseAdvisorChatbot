import React from "react";
import { assets } from "../Assets/assets";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const navigate = useNavigate();

  const handleEmailVerification = () => {
    navigate("/otpverification");
  };

  return (
    <div
      className="h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center px-4 sm:px-6">
        <div className="bg-white w-full max-w-md px-6 sm:px-10 md:px-16 py-8 sm:py-10 md:py-12 rounded-lg shadow-lg">
          <h1 className="text-2xl font-normal text-customGray text-center mb-6">
            Email Verification
          </h1>
          <p className="text-base text-black/50 text-center">
            Enter your email here to get 4-digit code
          </p>

          <div className="flex justify-center my-10">
            <input
              type="text"
              placeholder="email123@gmail.com"
              className="w-full max-w-md h-12 outline-none border-2 px-3"
            />
          </div>

          <button
            className="btn-primary w-full max-w-md"
            onClick={handleEmailVerification}
          >
            Send Otp
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
