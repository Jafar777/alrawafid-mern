import { Footer } from 'flowbite-react'
import React from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Link } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl'>
            <img src={alrawafid} className='w-40 h-40'/>
            </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 " >
                <div >
                <Footer.Title title='About' />
                <Footer.LinkGroup col>
                    <Footer.Link href='/projects'>
                         العروض العقارية
                    </Footer.Link>
                    <Footer.Link href='/orders'>
                         الطلبات العقارية
                    </Footer.Link>
                    <Footer.Link href='#'>
                          موقعنا الجغرافي
                    </Footer.Link>
                    
                </Footer.LinkGroup>
                </div>
                <div >
                <Footer.Title title='Media' />
                <Footer.LinkGroup col >
                    <Footer.Icon href='#' icon={FaInstagram}/>
                   <Footer.Icon href='#' icon={FaSnapchat}/>
                   <Footer.Icon href='#' icon={FaWhatsapp}/> 
                </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Legal' />
                <Footer.LinkGroup col>
                    <Footer.Link href='#'>
                         سياسة الخصوصية 
                    </Footer.Link>
                    <Footer.Link href='#'>
                         الشروط والأحكام 
                    </Footer.Link>
                    
                    
                </Footer.LinkGroup>
                </div>
                
            </div>
        </div>
        <Footer.Divider/>
        <div className="">
        <Footer.Copyright href='http://jafaralsoubeni.com/' by='Made by Jafar Al Soubeni' year={new Date().getFullYear()}/>
        </div>
      </div>
    </Footer>
  )
}
