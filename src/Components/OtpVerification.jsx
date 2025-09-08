import React from "react";
import { assets } from "../Assets/assets";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const handleOtpVerification = () => {
    navigate("/resetpassword");
  };

  return (
    <div
      className="h-screen bg-opacity-90 bg-cover bg-center"
      style={{ backgroundImage: `url(${assets.background_image})` }}
    >
      <div className="h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center">
        {/* Responsive box */}
        <div className="bg-white px-6 sm:px-10 md:px-16 py-8 sm:py-10 md:py-12 rounded-lg w-[90%] max-w-lg">
          <h1 className="text-xl sm:text-2xl font-normal text-customGray text-center mb-6">
            Otp Verification
          </h1>
          <p className="text-sm sm:text-base text-black/50 text-center sm:text-left">
            We have sent a code to your email <br className="sm:hidden" />
            email123@gmail.com
          </p>

          {/* Inputs */}
          <div className="flex justify-evenly my-8 sm:my-12 gap-2 sm:gap-4">
            <input type="text" className="otp_input_design " />
            <input type="text" className="otp_input_design " />
            <input type="text" className="otp_input_design " />
            <input type="text" className="otp_input_design " />
          </div>

          {/* Button */}
          <button
            className="btn-primary w-full sm:w-72 md:w-96 mb-4 sm:mb-6"
            onClick={handleOtpVerification}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;
