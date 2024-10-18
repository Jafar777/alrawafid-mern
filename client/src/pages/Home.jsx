import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Button, Footer } from 'flowbite-react';
import { FcHome } from "react-icons/fc";
import rawafidvid from "../assets/rawafidvid.mp4";
import rawafidnobg from "../assets/nobgrawafid.png";
import { GoArrowRight } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";
import { FaRegHandPointUp } from "react-icons/fa";
import nahdi from "../assets/Nahdi.svg"
import mojtama from "../assets/mojtama.png"
import naft from "../assets/naft.png"
import alam from "../assets/alam.png"
import { FaPhoneVolume, FaWhatsapp } from 'react-icons/fa6';
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
    <>
    <div className='relative flex flex-col'> 
    <section class="box"> 
        <video autoPlay loop muted plays-inline  >
          <source src={rawafidvid} type="video/mp4" className='video-media'/>
        
        </video>
        <div className='relative flex flex-col z-30 max-w-xl mx-auto md:mb-96  overflow-hidden text-white'>
      <img src={rawafidnobg} alt="pic" className='z-40 flex lg:w-auto md:w-auto w-40 sm:w-72 sm:mb-0 mx-auto'/>
                <h1 className='text-center font-semibold md:text-4xl sm:text-base mb-5'>
         أوجد بيت احلامك 
         <span className='text-yellow-500 md:text-4xl sm:text-base'> المثالي</span>
          <br />
          بسهولة مع مجموعة الروافد العقارية
        </h1>
        <div className='text-base  text-right text-white md:text-base sm:text-sm'>
          تصفح اخر العروض العقارية المثالية عبر منصتنا الالكترونية 
          <br />
          لدينا مجموعة واسعة من العروض العقارية من أجلك , لتختار منها 
        </div>
        <div className='flex md:flex-row lg:flex-row flex-col md:gap-20 lg:gap-20 gap-1 mx-auto'>
        <div id="rawafidborder" className='flex custom-font-color1 h-100vh justify-center items-center  gap-5 mt-5 text-lg border-2  rounded-full w-60 '>
        <FaPhoneVolume /><a id='arabic' href='tel:+966532178999'>إضغط هنا للإتصال المباشر</a>
        </div>
        <div id="rawafidborder" className='flex flex-row custom-font-color1 h-100vh justify-center items-center  gap-5 mt-5 text-lg border-2 rounded-xl w-60 '>
        <FaWhatsapp className='text-green-500 text-xl'/><a id='arabic' href='https://wa.me/966532178999' target="_blank">تواصل معنا على الواتساب</a>
      </div>
      </div>
      </div>
      
      
      </section>

      </div>




      {/* top ends here  */}
     <div className=' flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto mt-10 justify-center items-center'>
      <div className='card mt-40 mb-40'>
        <div className='face front'>
        <div className='blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10 custom-bg-color3'>
          <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1 mr-3'>من نحن ؟ </h1>
          <p id='arabic' className='mt-6 mb-6 text-lg font-bold text-white text-right'>
          </p>
          <Link to={'/about'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'><GoArrowRight className='bold text-3xl'/></button>
          </Link>
      </div>
        </div>

        <div className='face back'>
        <div className='blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10 custom-bg-color3'>
          <Link to={'/about'}>
          <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1 mr-3'>من نحن؟</h1>
          </Link>
          <p id='arabic' className='mt-6 mb-6 text-lg font-bold text-white text-right'>
          تأسست مجموعة الروافد العقارية عام 2008 (1429هـ) لتصبح أحد الرواد في مجال المقاولات العامة وإدارة وتنفيذ المشاريع الكبرى في المملكة العربية السعودية. منذ انطلاقتنا، تركنا بصمة مميزة عبر تنفيذ مشاريع ضخمة ومتنوعة، مما يعكس التزامنا الدائم بتطبيق سياسات مدروسة تقوم على أسس علمية دقيقة. بفضل خبراتنا الممتدة لأكثر من عقد، نجحنا في تحقيق توازن مثالي بين الجودة والكفاءة، مما يعزز مكانتنا كشريك موثوق في قطاع البناء والمقاولات.
          </p>
          <Link to={'/about'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'>الانقال لصفحة التعريف بالشركة<GoArrowRight className='bold text-3xl'/></button>
          </Link>
          
      </div>
        </div>
      </div>


        
      <div class="card mt-40 mb-40">
				<div class="face front">
        <div className='blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10'>
          <Link to={'/services'}>
          <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1'>ما هي خدماتنا  ؟</h1>
          </Link>
          <p id='arabic' className='mt-6 mb-6 text-lg font-bold custom-font-color3 text-right'>
          </p>
          <Link to={'/services'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold  w-80 h-14'><GoArrowRight className='bold text-3xl'/></button>
          </Link>
          
      </div>  

				</div>
				<div class="face back">
        <div className='blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10'>
          <Link to={'/services'}>
          <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1'>ما هي خدمات شركة مجموعة الروافد التجارية ؟</h1>
          </Link>
          <p id='arabic' className='mt-6 mb-6 text-lg font-bold custom-font-color3 text-right'>
          تقدم مجموعة الروافد العقارية باقة متكاملة من الخدمات التي تغطي كافة جوانب قطاع المقاولات وإدارة المشاريع. تشمل خدماتنا المقاولات العامة، إدارة المشاريع، أنظمة التكييف والتبريد والتهوية، أنظمة الألمنيوم والاستركشر والكلايدينغ، بالإضافة إلى الديكورات والدهانات. كما نقدم استشارات هندسية متخصصة وخدمات صيانة دورية لضمان استدامة المشاريع وجودتها. نلتزم بتقديم حلول مبتكرة تتماشى مع أعلى معايير الجودة العالمية، مما يجعلنا الخيار الأمثل لتنفيذ المشاريع العقارية بكفاءة واحترافية.
          </p>
          <Link to={'/services'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'>الانقال لصفحة خدمات الشركة<GoArrowRight className='bold text-3xl'/></button>
          </Link>
          
      </div>  

				</div>
			</div>
    
     
    

      <div class="card mt-40 mb-40">
				<div class="face front">
        <div className=' blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10 custom-bg-color3'>
          <Link to={'/projects'}>
          <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1 mr-3'>
            : مشاريع نفذتها مجموعة روافد
          </h1>
          </Link>
          <p id='arabic' className='mt-6 mb-6 text-lg font-bold text-right text-white'> 
          </p>
          <Link to={'/projects'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'><GoArrowRight className='bold text-3xl'/></button>
          </Link>
          
      </div>
				</div>
				<div class="face back">
        <div className=' blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10 custom-bg-color3'>
          <Link to={'/projects'}>
          <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1 mr-3'>
            : مشاريع نفذتها مجموعة روافد
          </h1>
          </Link>
          <p id='arabic' className='mt-6 mb-6 text-lg font-bold text-right text-white'>نفذت مجموعة الروافد العقارية مجموعة متنوعة من المشاريع الكبرى التي تغطي مجالات متعددة في قطاع العقارات والبناء. تشمل مشاريعنا السكنية والتجارية، باستخدام أحدث التقنيات والابتكارات لضمان الجودة والاستدامة. تميزنا بإدارة وتنفيذ مشاريع ضخمة بدقة واحترافية، مما يعزز من مكانتنا كشركة رائدة في السوق السعودي. نعمل على تحقيق أعلى مستويات الرضا لعملائنا من خلال تقديم حلول مبتكرة تلبي احتياجاتهم وتساهم في تطوير البنية التحتية بما يتماشى مع رؤية المملكة 2030..
          </p>
          <Link to={'/projects'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'>الانقال لصفحة المشاريع <GoArrowRight className='bold text-3xl'/></button>
          </Link>
          
      </div>
				</div>
			</div>

        
      <div class="card mt-40 mb-40">
				<div class="face front">
        <div className='blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10 '>
      <Link to={'/orders'}>
        <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1'>
           التسويق العقاري
        </h1> 
        </Link>
        <p id='arabic' className='mt-6 mb-6 text-lg font-bold custom-font-color3 text-right'> </p>
        <Link to={'/listingsearch'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold w-80 h-14'><GoArrowRight className='bold text-3xl'/></button>
          </Link>
          <br />
      </div>
				</div>
				<div class="face back">
        <div className='blockers flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto mt-10 '>
      <Link to={'/orders'}>
        <h1 className='md:text-4xl sm:text-base hover:underline font-bold custom-font-color1'>
           التسويق العقاري
        </h1> 
        </Link>
        <p id='arabic' className='mt-6 mb-6 text-lg font-bold custom-font-color3 text-right'>
        تقدم مجموعة الروافد العقارية حلولًا متكاملة للتسويق العقاري من خلال عروض متنوعة تناسب مختلف الاحتياجات. نساعد عملاءنا على استكشاف أفضل الفرص الاستثمارية في السوق من خلال قاعدة بيانات غنية بالعقارات المتاحة. كما نتيح لعملائنا إمكانية إرسال طلباتهم المخصصة، حيث يقوم فريقنا المتخصص بالبحث وتقديم العروض التي تتناسب تمامًا مع متطلباتهم. هدفنا هو تسهيل عملية الشراء أو الاستثمار العقاري من خلال توفير حلول تسويقية مبتكرة تلبي احتياجات الزبائن وتضمن أعلى مستويات الرضا.
        </p>
        <Link to={'/listingsearch'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'>العروض العقارية المتوفرة <GoArrowRight className='bold text-3xl'/></button>
          </Link>
          <br />
          <Link to={'/orders'} className='flex'>
          <button id='rawafidborder' className='flex flex-row items-center justify-center gap-5 custom-font-color1 rounded-full font-bold border-2 w-80 h-14'>راسلنا هنا لطلب عقار معين <FaRegHandPointUp className='bold text-3xl'/></button>
          </Link>
      </div>
				</div>
			</div>
     
      
      </div>


      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto mt-10 '>
        <h1 className='font-bold text-3xl custom-font-color1 mx-auto z-50'> بعض عملائنا</h1> 
          <div className='flex gap-6 p-10 px-3 max-w-4xl mx-auto'>
            <img src={nahdi} alt="" className='lg:w-60 lg:h-36 md:w-60 md:h-36 w-16 h-16' /> 
            <img src={mojtama} alt="" className='lg:w-60 lg:h-36 md:w-60 md:h-36 lg:mr-10 md:mr-10 w-16 h-16' />
            <img src={naft} alt="" className='lg:w-60 lg:h-36 md:w-36 md:h-36 w-16 h-16' />
            <img src={alam} alt="" className='lg:w-60 lg:h-36 md:w-36 md:h-36 w-16 h-16' />
          </div>
      </div>

    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl text-right mx-auto'>
      <h1 className='font-bold text-3xl custom-font-color1 mx-auto mb-5'> زيارة الفرع الرئيسي</h1> 
      <p className='text-center custom-font-color3 text-lg font-bold flex justify-center items-center gap-5'><CiLocationOn className='text-red-600 text-3xl' />جدة - طريق الملك عبدالعزيز الفرعي - جانب بنك ساب الاول - مبنى 23514</p> 
      <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4574.046903513567!2d39.11944760000001!3d21.6066003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3dbb97b7a456b%3A0xd77a1efe79db1eaa!2z2YXZg9iq2Kgg2KfZhNmF2K3Yp9mF2Yog2YXYrdmF2K8g2KzYp9io2LEg2KfZhNi02YfYsdmK!5e1!3m2!1sen!2ssa!4v1728743517641!5m2!1sen!2ssa" className= "mx-auto w-3/4 h-96">
      </iframe></p>
      </div>
    </>
  );
}