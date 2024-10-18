import React, { useRef, useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
//6LdNDmUqAAAAAKZ80MEluSclWGESMyzlImtwIc7w
// 

const Form = () => {
  const [name, setName] = useState("") 
  const form = useRef();
  const [capVal, setCapVal] = useState();
  //emailjs
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      emailjs
      .sendForm('service_a2tp58j', 'template_k4cfprj', form.current, {
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
     } catch (err) {
       console.log(err)     
     }
     setCapVal();

    
 
  };


   return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className=''>
      <h1 className='text-center font-semibold md:text-4xl sm:text-base mb-10 custom-font-color1'>أرسلوا طلباتكم الشخصية ضمن هذه القائمة</h1>
   <form id='arabic' ref={form} onSubmit={sendEmail}  class="max-w-sm mx-auto border-2 p-3 rounded-md">
  
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">الاسم الأول</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">الاسم الثاني</label>
    </div>
  </div>
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="tel" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ">رقم الجوال (0560xxxxxx)</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">الشركة (مثلا Google) (اختياري)</label>
    </div>
  </div>
  
            
               <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رسالتك :</label>
               <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="اكتب رسالتك هنا..."></textarea>
            <ReCAPTCHA className='flex justify-center items-center mt-5'
           sitekey="6LdNDmUqAAAAAKZ80MEluSclWGESMyzlImtwIc7w"
           onChange={(val) => setCapVal(val)}          
         />
               <div className='flex justify-center items-center mt-5'>
                 <input
                 id="rawafidborder"
                  class="flex custom-font-color1 h-10 justify-center items-center  gap-5 mt-5 text-lg border-2  rounded-full w-60 "
                   type="submit"
                   value="إرسال"
                   disabled={!capVal}
                 />
               </div>
             </form>
             </div>
             </div> )
  }
  
  export default Form