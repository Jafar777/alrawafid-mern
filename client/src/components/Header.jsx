import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Link,useLocation } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon } from "react-icons/fa";


export default function Header() {

  const path = useLocation().pathname;
  return (
    

    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl'><img src={alrawafid} alt="" className='w-28 h-28'/></Link>
      <form >
        <TextInput
        type='text'
        placeholder='بحث'
        rightIcon={AiOutlineSearch}
        className='hidden lg:inline'
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch  />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
        <Button gradientDuoTone="greenToBlue" outline>
          تسجيل الدخول
        </Button>
        </Link>
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={'div'}> 
            <Link to='/'>الصفحة الرئيسية</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={'div'}>
            <Link to='/about'>نبذة</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={'div'}>
            <Link to='/projects' >العروض العقارية</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
