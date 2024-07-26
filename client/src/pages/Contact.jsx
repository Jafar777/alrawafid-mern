import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Button, Textarea, TextInput } from 'flowbite-react';
import { MdOutlineEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

export default function Contact() {

    const form = useRef();
    const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_p77k7mw', 'template_k4cfprj', form.current, {
        publicKey: 'e4FKSkd7-mx1hX43Z',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

    //emailjs stuff
    
  return (
    <>
    <div className="flex flex-col items-center justify-center gap-4 mt-10 ">
        <h1 className='text-xl font-semibold '>تواصل معنا</h1>
        <span className='flex space gap-4 '><MdOutlineEmail />S.alqarni2022@gmail.com</span>
        <span className='flex space gap-4 '><FaPhone />0532178999 | 0554570440</span>
        
    </div>

    <div className="flex justify-center items-center min-h-screen ">
    <div className='max-w-xl mx-auto p-3 w-full border-yellow-400 border-4 ' >
    <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-4'>
        <h1 className='my-7 text-center font-semibold text-3xl'>أو اكتب رسالتك لنا</h1>
      <TextInput color="warning" placeholder='الاسم' name="user_name" required/>        
      <TextInput color="warning" placeholder='ايميلك' name="user_email" required/>      
      <Textarea color="warning" placeholder='رسالتك' name="message" required/>      
      <Button type='submit' outline color="warning">ارسال</Button>
    
  </form>
  </div></div>
  </>
   
  )
}
