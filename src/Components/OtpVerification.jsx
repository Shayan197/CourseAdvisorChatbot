import React from 'react'
import { assets } from '../Assets/assets'
import { useNavigate } from 'react-router-dom'

const OtpVerification = () => {

  const nevigate = useNavigate()
    const handleOtpVerification = () => {
      nevigate('/resetpassword')
    }
  return (
    <div className='h-screen bg-opacity-90 bg-cover bg-center' style={{ backgroundImage: `url(${assets.background_image})` }}>
          <div className='h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center'>
            <div className='bg-white px-16 py-12 rounded-lg'>
              <h1 className='text-2xl font-normal text-customGray text-center mb-6'>Otp Verification</h1>
              <p className='text-base text-black/50'>We have sent a code to your email email123@gmail.com</p>
              <div className='flex justify-evenly my-12'>
                <input type="text" className='otp_input_design'/>
                <input type="text" className='otp_input_design'/>
                <input type="text" className='otp_input_design'/>
                <input type="text" className='otp_input_design'/>
              </div>
              <button className='btn-primary w-96 mb-6' onClick={handleOtpVerification}>Confirm</button>
            </div>
          </div>
        </div>
  )
}

export default OtpVerification
