import { Footer } from 'flowbite-react'
import React from 'react'
import alrawafid from "../assets/alrawafid.png"
import { Link } from 'react-router-dom'
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer  className='custom-bg-rawafid mb-0 '>
      <div className="w-full max-w-7xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1 ">
            <div className="mt-5 ">
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl '>
            <img src={alrawafid} className='h-60 '/>
            </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6 sm:items-right " >
                <div >
                <Footer.Title title='About' className='text-yellow-500 text-lg' />
                <Footer.LinkGroup col>
                    <Footer.Link href='/listingsearch' className='custom-font-color1'>
                         العروض العقارية
                    </Footer.Link>
                    <Footer.Link href='https://maps.app.goo.gl/pMvoj2aYUM7UGpKu5' className='custom-font-color1'>
                          موقعنا الجغرافي
                    </Footer.Link>
                    
                </Footer.LinkGroup>
                </div>
                <div >
                <Footer.Title title='Media' className='text-yellow-500 text-lg'/>
                <Footer.LinkGroup col >
                    <Footer.Icon href='https://www.instagram.com/alrawafidgroup/' icon={FaInstagram} className='custom-font-color1 '/>
                   <Footer.Icon href='https://x.com/AlrawafidGroup' icon={FaXTwitter } className='custom-font-color1'/>
                   <Footer.Icon href="https://wa.me/966532178999" icon={FaWhatsapp} className='custom-font-color1'/> 
                </Footer.LinkGroup>
                </div>
                
                
            </div>
        </div>
        <Footer.Divider />
        <div >
        <Footer.Copyright href='http://jafaralsoubeni.com/' by='Made by Jafar Al Soubeni' year={new Date().getFullYear()} className='custom-font-color1 text-lg mb-8'/>
        </div>
      </div>
    </Footer>
  )
}
