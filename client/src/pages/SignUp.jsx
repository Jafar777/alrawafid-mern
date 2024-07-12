import React from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Button, Flowbite, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        <div className='flex-1'>
        <img src={alrawafid} alt="" className='mx-auto w-40 h-40'/>
          <p className='text-sm mt-5'> 
            قم بانشاء حساب على موقع روافد العقارية بامكانك انشاء حسابك  بالبريد الالكتروني وكلمة مروراو سجل الدخول بحساب غوغل
          </p>
        </div>
        
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div >
              
              <Label value='Your username'/>
              <TextInput 
                type='text'
                placeholder='اسم المستخدم'
                id='username'
              />

            </div>
            <div className=''>
              
              <Label value='Your email'/>
              <TextInput 
                type='email'
                placeholder='example@email.com'
                id='email'
              />

            </div>
            <div className=''>
              
              <Label value='Your password'/>
              <TextInput 
                type='password'
                placeholder='كلمة المرور'
                id='password'
              />

            </div>
            <Button gradientDuoTone="greenToBlue" outline type='submit'>
              إنشاء حساب جديد
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            
            <Link to='/sign-in' className='text-blue-500'>
            تسجيل الدخول
            </Link>
            <span>لديك حساب ؟  </span>
          </div>
        </div>

      </div>
    </div>
  )
}
