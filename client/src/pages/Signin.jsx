import { useState } from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'

export default function SignIn() {
  const [formData , setFormData ] = useState({});
  const {loading,error:errorMessage} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]: e.target.value.trim()})
  };
  const handleSubmit = async (e)=> {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('راجاءً إملأ جميع الحقول المطلوبة'))
    }
    try{
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if (data.success === false){
        dispatch(signInFailure(data.message));
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    }catch(error){

      dispatch(signInFailure(error.message));

    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

        <div className='flex-1'>
        <img src={alrawafid} alt="" className='mx-auto w-40 h-40'/>
          <p className='text-sm mt-5'> 

            قم بتسجيل الدخول لحسابك في موقع روافد عبر كتابة البريد الالكتروني وكلمة المرور

          </p>
        </div>
        
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
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
              ):  'تسجيل الدخول' 
              }
            
            </Button>
            <OAuth></OAuth>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            
            <Link to='/sign-up' className='text-blue-500'>
            إنشاء حساب جديد
            </Link>
            <span>ليس لديك حساب ؟  </span>
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
