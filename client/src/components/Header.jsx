import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import React, { useEffect } from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Link,useLocation,useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon,FaSun } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux';
import {toggleTheme} from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';
import { useState } from 'react';

export default function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {currentUser} = useSelector(state => state.user)
  const path = useLocation().pathname;
  const {theme} = useSelector((state)=> state.theme);
  
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
const handleSubmit = (e) =>{
  e.preventDefault();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set('searchTerm',searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`)
}
  return (
    

    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl'><img src={alrawafid} className='w-28 h-28'/></Link>
      <form onSubmit={handleSubmit}>
        <TextInput
        type='text'
        value={searchTerm}
        onChange={(e)=> setSearchTerm(e.target.value)}
        placeholder='بحث'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch  />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
          {theme === 'light'? <FaSun/>:<FaMoon/>}
          
        </Button>

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
            <Dropdown.Item onClick={handleSignOut}>تسجيل الخروج</Dropdown.Item>
          </Link>

          </Dropdown>
        ) :<Link to="/sign-in">
        <Button gradientDuoTone="greenToBlue" outline>
          تسجيل الدخول
        </Button>
        </Link> }
        
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}> 
            <Link to='/'>الصفحة الرئيسية</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to='/about'> نبذة عنا</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/contact"} as={'div'}>
            <Link to='/contact' > تواصل</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
