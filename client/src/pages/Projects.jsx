import React from 'react'
import { FaTurnDown } from "react-icons/fa6";
import project1 from "../assets/projects1.png"
import project2 from "../assets/projects2.png"
import project3 from "../assets/projects3.png"
import project4 from "../assets/projects4.png"
import project5 from "../assets/projects5.png"
import project6 from "../assets/projects6.png"
import project7 from "../assets/projects7.png"
export default function Projects() {
  return (
    <div className='flex flex-col justify-center items-center'>
    <div className='flex custom-font-color1 w-auto justify-center items-center  gap-20 mt-20 text-4xl border-4 p-6 rounded-xl border-transparent custom-bg-rawafid'>
    <h1 className='cursor-default'> إليكم بعض مشاريعنا</h1> 
    <FaTurnDown /></div>
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl text-center mx-auto'>
        
        
        <img src={project1} alt="projects" />
        <img src={project2} alt="projects" />
        <img src={project3} alt="projects" />
        <img src={project4} alt="projects" />
        <img src={project5} alt="projects" />
        <img src={project6} alt="projects" />
        <img src={project7} alt="projects" />
      </div>
    </div>
    </div>
  )
}
