import { Avatar, Button, Dropdown, DropdownDivider, Navbar} from 'flowbite-react'
import React, { useEffect } from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai';
import {useSelector,useDispatch} from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import { useState } from 'react';


export default function Header() {



  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  const path = useLocation().pathname;
  const [searchTerm , setSearchTerm]= useState('');



  useEffect(()=> {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search])

  const handleSignOut = async () =>{
    try {
        const res = await fetch('/api/user/signout' , {
            method: 'POST',
        })
        const data = await res.json();
        if(!res.ok){
            console.log(data.message);
        }else{
            dispatch(signOutSuccess())
        }
    } catch (error) {
        console.log(error.message)
        
    }
};

  return (
    

    <Navbar className='custom-bg-rawafid h-fit'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl'>
      <img src={alrawafid} className='w-48'/>
      </Link>

      <div className='flex gap-2 md:order-2'>

        {currentUser ? (
          <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt='user avatar' img={currentUser.profilePicture}
            rounded
            />
              
            
          }
          >
          <Dropdown.Header>
            <span className='block text-sm'>@{currentUser.username}</span>
            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
          </Dropdown.Header>

          <Link to={'/dashboard?tab=profile'}> 
            <Dropdown.Item>
              الحساب
            </Dropdown.Item>
            <DropdownDivider />
            <Dropdown.Item  onClick={handleSignOut}>تسجيل الخروج</Dropdown.Item>
          </Link>

          </Dropdown>
        ) :<Link to="/sign-in">
        <button className='text-yellow-500 hover:text-yellow-600'>
          تسجيل الدخول
        </button>
        </Link> }
        
        <Navbar.Toggle className='text-yellow-400 hover:bg-transparent hover:text-yellow-500'/>
      </div>
      <Navbar.Collapse >
          <Navbar.Link className="custom-font-color1 hover:text-yellow-500  text-base font-bold active:text-blue-600 " active={path === "/"} as={'div'}> 
            <Link className="custom-font-color1 hover:text-yellow-500  text-base font-bold active:text-blue-600" to='/'>الصفحة الرئيسية</Link>
          </Navbar.Link>
          <Navbar.Link className="custom-font-color1 hover:text-yellow-500  text-base font-bold active:text-blue-600 " active={path === "/projects"} as={'div'}> 
            <Link className="custom-font-color1 hover:text-yellow-500  text-base font-bold active:text-blue-600" to='/projects'>مشاريعنا</Link>
          </Navbar.Link>
          <Navbar.Link className="custom-font-color1 hover:text-yellow-500  text-base font-bold active:text-blue-600 " active={path === "/services"} as={'div'}> 
            <Link className="custom-font-color1 hover:text-yellow-500  text-base font-bold active:text-blue-600" to='/services'> خدماتنا </Link>
          </Navbar.Link>

          {/*from here */} 

          
          <div className="dropdown">
              <button className="dropbtn">التسويق العقاري</button>
              <div className="dropdown-content">
              <Navbar.Link  className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600 "  active={path === "/listingsearch "} as={'div'} >
                    <Link className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600 " to='/listingsearch'>  العروض العقارية </Link>
                  </Navbar.Link>

                  <Navbar.Link  className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600 "  active={path === "/orders "} as={'div'} >
                    <Link className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600 " to='/orders'>  الطلبات العقارية </Link>
                  </Navbar.Link>
              </div>
              
          </div>





          {/* till here */} 
          
              
          
          <Navbar.Link className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600 " active={path === "/about"} as={'div'}>
            <Link className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600" to='/about' > نبذة عننا</Link>
          </Navbar.Link>
          <Navbar.Link className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600 " active={path === "/contact"} as={'div'}>
            <Link className="custom-font-color1 hover:text-yellow-500 text-base font-bold active:text-blue-600" to='/contact' > إتصل بنا</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    

    
  )
}
