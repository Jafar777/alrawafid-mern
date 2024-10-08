import { useState } from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData , setFormData ] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading ] = useState(null);
  const navigate=useNavigate();
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value.trim()})
  };
  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields. ');
    }
    try{
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if (data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    }catch(error){

      setErrorMessage(error.message);
      setLoading(false);

    }
  }
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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div >
              
              <Label value='Your username'/>
              <TextInput 
                type='text'
                placeholder='اسم المستخدم'
                id='username' onChange={handleChange}
              />

            </div>
            <div className=''>
              
              <Label value='Your email'/>
              <TextInput 
                type='email'
                placeholder='example@email.com'
                id='email' onChange={handleChange}
              />

            </div>
            <div className=''>
              
              <Label value='Your password'/>
              <TextInput 
                type='password'
                placeholder='كلمة المرور'
                id='password'  onChange={handleChange}
              />

            </div>
            <Button gradientDuoTone="greenToBlue" outline type='submit' disabled={loading}>
              {
              loading ? 
              (
                <><Spinner size='sm' /> <span>Loading ...</span></>
              ):  ' إنشاء حساب جديد' 
              }
            
            </Button>
            <OAuth></OAuth>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            
            <Link to='/sign-in' className='text-blue-500'>
            تسجيل الدخول
            </Link>
            <span>لديك حساب ؟  </span>
          </div>
          {
          errorMessage && 
          (
          <Alert className='mt-5' color='failure' >
            {errorMessage }
            </Alert>
            
          )
          
          }
          
        </div>

      </div>
    </div>
  );
}
