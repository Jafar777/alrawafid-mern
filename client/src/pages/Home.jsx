import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { Button, Footer } from 'flowbite-react';
import { FcHome } from "react-icons/fc";

import project2 from "../assets/projects2.png"
import project3 from "../assets/projects3.png"
import project5 from "../assets/projects5.png"
import project7 from "../assets/projects7.png"
import nahdi from "../assets/Nahdi.svg"
import mojtama from "../assets/mojtama.png"
import naft from "../assets/naft.png"
import alam from "../assets/alam.png"
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-lg mx-auto '>
        <h1 className='my-7 text-center font-semibold text-3xl'>
         أوجد بيت احلامك <span className='text-yellow-500'>المثالي</span>
          <br />
          بسهولة مع مجموعة الروافد العقارية
        </h1>
        <div className=' text-xs sm:text-sm text-right'>
          تصفح اخر العروض العقارية المثالية عبر منصتنا الالكترونية 
          <br />
          لدينا مجموعة واسعة من العروض العقارية من أجلك , لتختار منها 
        </div>
        
        <Link to={'/listingsearch'}className='text-lg sm:text-base font-bold mt-8'>
          <Button gradientDuoTone="greenToBlue" pill size="lg">
               تصفح العروض العقارية <FcHome className="ml-2 h-5 w-5" ></FcHome>
               
          </Button>
        
        </Link>
      </div>
      <Footer.Divider/>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto'>
      <h1 className='font-bold text-3xl text-teal-600 mx-auto'>نبذة عننا</h1> <br /> <br />
      <h1 className='font-bold text-2xl text-teal-600'>من نحن؟</h1>
      <p><span className='text-yellow-500 font-bold text-xl'>روافد الفكر للمشاريع</span> حفرت بصمة في مجال المقاولات العامة وإدارة وتنفيذ المشاريع الهامة والكبرى, الأمر الذي يعكسه حجم المشاريع التي تم إنجازها خلال السنوات الماضية من خلال سياسات مدروسة على أسس علمية منذ انطلاقة الشركة الأولى عام 1429هـ</p>
      <br />
      <br />
      <h1 className='font-bold text-2xl text-teal-600'>: رؤيتنا</h1>
      <p>
      معايير عملنا التي تعزز ريادتنا للخدمات المتكاملة في مجال المقاولات العامة  
      </p> <br />
      <h1 className='font-bold text-2xl text-teal-600'>: أهدافنا</h1>
      <p> <span className='text-yellow-500 font-bold text-xl'>إنشاء بيئة عمل متكاملة </span>
        نستثمر من خلالها أعلى الكفائات والخبرات البشرية وتعززها أحدث التقنيات الهندسية والعلمية المطبقة عالمياً لمواكبة احتياجات ومتطلبات السوق السعودي والعربي بشكل عام مع مسيرة التطوير والتنمية التي تشهدها المملكة العربية السعودية بكافة مناحي الحياة والمجتمع
      </p>

    <br /><br />
      <h1 className='font-bold text-2xl text-teal-600'>: خدماتنا</h1>
      <li className='text-yellow-500 font-bold text-xl'>
          <ul>التكييف والتهوئة</ul> <br />
          <ul> أنظمة الألمنيوم والاستركشر أعمال الكلايدينغ</ul> <br />
          <ul> الديكورات والدهانات</ul> <br />
          <ul>التسويق العقاري</ul>
      </li>
      </div>
      <Footer.Divider/>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto'>
        <h1 className='font-bold text-3xl text-teal-600 mx-auto'> إليكم بعض مشاريعنا</h1> <br /> <br />
        <img src={project2} alt="projects" />
        <img src={project3} alt="projects" />
        <img src={project5} alt="projects" />
        <img src={project7} alt="projects" />
      </div>
      <Footer.Divider/>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
      <h1 className='font-bold text-3xl text-teal-600 mx-auto'> بعض عملائنا</h1> <br /> <br />
      <div className='flex gap-6 p-10 px-3 max-w-6xl mx-auto'>
        
      <img src={nahdi} alt="" className='w-60 h-36' /> 
      <img src={mojtama} alt="" className='w-44 h-36 mr-10' />
      <img src={naft} alt="" className='w-36 h-36' />
      <img src={alam} alt="" className='w-36 h-36' />
      
      </div>
      
      </div>
      
      <Footer.Divider/>

      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto'>
      <h1 className='font-bold text-3xl text-teal-600 mx-auto'> موقعنا الجغرافي</h1> <br /> <br />
      <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4574.046903513567!2d39.11944760000001!3d21.6066003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbb97b7a456b%3A0xd77a1efe79db1eaa!2z2YXZg9iq2Kgg2KfZhNmF2K3Yp9mF2Yog2YXYrdmF2K8g2KzYp9io2LEg2KfZhNi02YfYsdmK!5e1!3m2!1sen!2ssa!4v1728743517641!5m2!1sen!2ssa" className= "mx-auto w-3/4 h-96">
      </iframe></p>
      </div>
      
    </div>
  );
}