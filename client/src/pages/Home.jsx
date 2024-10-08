import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';


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
        <Link
          
          to={'/listingsearch'}
          className='text-lg sm:text-base font-bold mt-8'
        >
          <Button gradientDuoTone="greenToBlue" pill size="lg">   ابدأ تصفح العروض العقارية <HiOutlineArrowRight className="ml-2 h-5 w-5" ></HiOutlineArrowRight></Button>
        
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '>آخر العروض</h2>
              <Link className='text-sm text-blue-400 hover:underline' to={'/listingsearch?offer=true'}>عرض المزيد</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '>
                بعض عروض الإيجار
              </h2>
              <Link className='text-sm text-blue-400 hover:underline' to={'/listingsearch?type=rent'}>
              عرض المزيد</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold '>
                بعض عروض البيع
              </h2>
              <Link className='text-sm text-blue-400 hover:underline' to={'/listingsearch?type=sale'}>عرض المزيد</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}