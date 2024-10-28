import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { Button, Checkbox, Label,  TextInput } from 'flowbite-react';
import Select from 'react-select'




export default function Search() {
  const navigate = useNavigate();
  const propertyOptions = [
    { value: 'all', label: 'الكل' },
    { value: 'land', label: 'أرض' },
    { value: 'apartment', label: 'شقة' },
    { value: 'villa', label: 'فلة' },
    { value: 'building', label: 'عمارة' },
    { value: 'shop', label: 'محل تجاري' },
    { value: 'office', label: 'مكتب ' },
  ]

  const cityOptions = [
    { value: 'all', label: 'الكل' },
    {value: "Makkah", label:"منطقة مكة المكرمة"},
    {value: "Medina", label:"المدينة المنورة"},
    {value: "Riyadh", label:"الرياض"},
    {value: "Al-Qassim", label:"القصيم"},
    {value: "Dammam", label:"الدمام"},
    {value: "Najran", label:"نجران"},
    {value: "Tabuk", label:"تبوك"},
  ]


  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [query,setQuery] = useState("");





  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };



  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
 

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='flex flex-col p-7  border-b-2 md:border-r-2 md:min-h-screen '>
        <label htmlFor="search" className='custom-font-color2 mb-2' id='arabic'>ابحث عن اسم عقارك هنا : </label>
        <input type="text" id='arabic' placeholder='بحث...' onChange={e=> setQuery(e.target.value)} className="search mb-2" />
        <h3 id='arabic' className='mt-4 mb-2 custom-font-color2'> أو استعمل فلاتر متقدمة للبحث :</h3>
        <div className='flex justify-around items-center gap-2 '>
          <div id='arabic' className='flex items-center gap-2'>
          <input type='radio' defaultChecked name='type'></input>
          <label >الكل</label>
          <input type='radio'  name='type'></input>
          <label >بيع</label>
          <input type='radio' name='type'></input>
          <label >إيجار</label>
          </div>
         
        </div>
        <h3 id='arabic' className='mt-4 mb-2 custom-font-color2'> حدد العقار : </h3>
        <div>
          <Select options={propertyOptions} placeholder="اختر" id='arabic'/>
        </div>
        <h3 id='arabic' className='mt-4 mb-2 custom-font-color2'>اختر المنطقة :</h3>
        <div>
          <Select options={cityOptions} placeholder="المنطقة" id="arabic"/>
        </div>
        
        
      </div>
      <div className='w-full'>
        <h1 className='text-center text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          العروض العقارية
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-gray-500'>ليس هنالك عروض حالياً</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.filter(listing=>listing.name.includes(query)).map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='custom-font-color1 hover:underline p-7 text-center w-full'
            >
              إظهار المزيد
            </button>
          )}
        </div>
      </div>
    </div>
  );
}