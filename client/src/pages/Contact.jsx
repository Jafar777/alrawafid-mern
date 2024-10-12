import React, { useRef } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function Contact() {
      
  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4 mt-10 ">
        <h1 className='text-2xl font-extrabold text-yellow-500'>نسعد بتواصلكم معنا</h1>
        <div className=' text-xs sm:text-sm text-right'>
          لمناقشة احد العروض الموجودة أو لإضافة عروضكم الشخصية
           قومو بالتواصل معنا 
        </div>
        <br />
        <br />
        <br />
        <br />
        <span className='flex space gap-4 text-lg'><MdOutlineEmail />alrawafid.g@hotmail.com</span>
        <span className='flex space gap-4 text-lg'><FaPhone />0532178999 </span>
        <span className='flex space gap-4 text-2xl border-solid text-green-500'> <FaWhatsapp /> <a href="https://wa.me/966532178999" target="_blank" className="flex option">   اضغط للتواصل واتساب     </a></span>
        <span  className='flex space gap-4 text-2xl border-solid text-slate-500'>
        <FaXTwitter /> <a href="https://x.com/AlrawafidGroup">تابعنا وتواصل معنا على منصة إكس</a> 
        </span>
        <span  className='flex space gap-4 text-2xl border-solid text-purple-800'>
        <FaInstagram /> <a href="https://www.instagram.com/alrawafidgroup/"></a> تابعنا وتواصل معنا على انستاغرام
        </span>
        </div>
        <br /><br />
        <h1 className='text-2xl font-extrabold text-center text-yellow-500 '>قومو بزيارة شركتنا</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4574.046903513567!2d39.11944760000001!3d21.6066003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbb97b7a456b%3A0xd77a1efe79db1eaa!2z2YXZg9iq2Kgg2KfZhNmF2K3Yp9mF2Yog2YXYrdmF2K8g2KzYp9io2LEg2KfZhNi02YfYsdmK!5e1!3m2!1sen!2ssa!4v1728743517641!5m2!1sen!2ssa" className="mx-auto w-9/12 h-96 mt-11 mb-24">
          </iframe>
    
    
    


    

  </>
   
  )
}
