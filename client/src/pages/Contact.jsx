import React, { useRef } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone, FaPhoneVolume } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Contact() {
      
  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4 mt-10 ">
        <h1 className='text-4xl font-extrabold custom-font-color1 mb-6'>نسعد بتواصلكم معنا</h1>
        <div className=' custom-font-color2 font-bold text-sm lg:text-base md:text-base text-right mb-16'>
          لمناقشة احد العروض الموجودة أو لإضافة عروضكم الشخصية
           قومو بالتواصل معنا 
        </div>
        
        
        <div id="rawafidborder" className='flex flex-row custom-font-color1 lg:h-100vh md:h-100vh lg:text-4xl md:text-4xl md:w-1/2 lg:w-1/2 justify-center items-center  gap-20 mt-5 text-base lg:border-4 md:border-4  md:p-6 lg:p-6 border-2 p-2 rounded-xl'>
        <MdOutlineEmail/><a id='arabic' href='mailto:alrawafid.g@hotmail.com'>إضغط هنا للتواصل على الايميل</a>
        </div>
        <div id="rawafidborder" className='flex flex-row custom-font-color1 lg:h-100vh md:h-100vh lg:text-4xl md:text-4xl md:w-1/2 lg:w-1/2 justify-center items-center  gap-20 text-base lg:border-4 md:border-4  md:p-6 lg:p-6 border-2 p-2 rounded-xl'>
        <FaPhoneVolume /><a id='arabic' href='tel:+966532178999'>إضغط هنا للإتصال المباشر</a>
        </div>
        <div id="rawafidborder" className='flex flex-row custom-font-color1 lg:h-100vh md:h-100vh lg:text-4xl md:text-4xl md:w-1/2 lg:w-1/2 justify-center items-center  text-base lg:border-4 md:border-4  md:p-6 lg:p-6 border-2 p-2 rounded-xl gap-20'>
        <FaWhatsapp className='text-green-500'/><a id='arabic' href='https://wa.me/966532178999' target="_blank">تواصل معنا على الواتساب</a>
      </div>
        <div id="rawafidborder" className='flex flex-row custom-font-color1 lg:h-100vh md:h-100vh lg:text-4xl md:text-4xl md:w-1/2 lg:w-1/2 justify-center items-center  text-base lg:border-4 md:border-4  md:p-6 lg:p-6 border-2 p-2 rounded-xl gap-20'>
        <FaXTwitter className='text-gray-500 '/><a id='arabic' href='https://x.com/AlrawafidGroup' target="_blank">حسابنا على منصة إكس</a>
      </div>
        <div id="rawafidborder" className='flex flex-row custom-font-color1 lg:h-100vh md:h-100vh lg:text-4xl md:text-4xl md:w-1/2 lg:w-1/2 justify-center items-center  text-base lg:border-4 md:border-4  md:p-6 lg:p-6 border-2 p-2 rounded-xl gap-24'>
        <FaInstagram className='text-purple-500' /><a id='arabic' href='https://www.instagram.com/alrawafidgroup/' target="_blank">حسابنا على انستاغرام</a>
      </div>
        
        
        </div>
        
        <h1 className='text-4xl font-extrabold text-center text-yellow-500 mt-20'>موقعنا الجغرافي</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4574.046903513567!2d39.11944760000001!3d21.6066003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbb97b7a456b%3A0xd77a1efe79db1eaa!2z2YXZg9iq2Kgg2KfZhNmF2K3Yp9mF2Yog2YXYrdmF2K8g2KzYp9io2LEg2KfZhNi02YfYsdmK!5e1!3m2!1sen!2ssa!4v1728743517641!5m2!1sen!2ssa" className="mx-auto w-9/12 h-96 mt-11 mb-24">
          </iframe>
    
    
    


          

  </>
   
  )
}
