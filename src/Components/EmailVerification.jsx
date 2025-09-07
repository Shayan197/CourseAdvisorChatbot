
import React from 'react'
import { assets } from '../Assets/assets'
import { useNavigate } from 'react-router-dom'

const EmailVerification = () => {

  const nevigate = useNavigate()
  const handleEmailVerification = () => {
    nevigate('/otpverification')
  }
  return (
    <div className='h-screen bg-opacity-90 bg-cover bg-center' style={{ backgroundImage: `url(${assets.background_image})` }}>
              <div className='h-full bg-gradient-to-b from-customBlue/80 via-[#1062BB]/80 to-[#000000]/80 flex items-center justify-center'>
                <div className='bg-white px-16 py-12 rounded-lg'>
                  <h1 className='text-2xl font-normal text-customGray text-center mb-6'>Email Verification</h1>
                  <p className='text-base text-black/50 text-center'>Enter your email here to get 4-digit code</p>
                  <div className='flex justify-evenly my-14'>
                    <input type="text" placeholder='email123@gmail.com' className='w-96 h-12 outline-none border-2 px-3 py-0'/>
                  </div>
                  <button className='btn-primary w-96 mb-6' onClick={handleEmailVerification}>Send Otp</button>
                </div>
              </div>
            </div>
  )
}

export default EmailVerification
