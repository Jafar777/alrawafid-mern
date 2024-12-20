import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
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
    {value: 'all', label: 'الكل' },
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

  const fetchListings = async () => {
    setLoading(true);
    setShowMore(false);

    // Build the query string based on filters
    const params = new URLSearchParams({
      searchTerm: sidebardata.searchTerm,
      type: sidebardata.type,
      parking: sidebardata.parking,
      furnished: sidebardata.furnished,
      offer: sidebardata.offer,
      sort: sidebardata.sort,
      order: sidebardata.order,
    });

  
  const res = await fetch(`/api/listing/get?${params}`);
  const data = await res.json();

  setListings(data);
  setShowMore(data.length > 8);
  setLoading(false);
};

useEffect(() => {
  fetchListings();
}, [sidebardata]); // Trigger re-fetch on sidebardata changes

const handleFilterChange = (e) => {
  const { id, value, checked, type } = e.target;
  setSidebardata((prev) => ({
    ...prev,
    [id]: type === 'checkbox' ? checked : value,
  }));
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
    <div className='flex flex-col md:flex-row ' >
      <div className='flex flex-col p-7  border-b-2 md:border-r-2 md:min-h-screen ' id='arabic'>
        <label htmlFor="search" className='custom-font-color2 mb-2' id='arabic'>ابحث عن اسم عقارك هنا : </label>
        <input
          type='text'
          id='searchTerm'
          placeholder='بحث...'
          onChange={handleFilterChange}
          className='search mb-2'
        />
        <h3 id='arabic' className='mt-4 mb-2 custom-font-color2'> أو استعمل فلاتر متقدمة للبحث :</h3>
        <div className='flex justify-around items-center gap-2 '>
          <div id='arabic' className='flex items-center gap-2'>
          <label>
            <input
              type='radio'
              id='type'
              value='all'
              checked={sidebardata.type === 'all'}
              onChange={handleFilterChange}
            />
            الكل
          </label>
          <label>
            <input
              type='radio'
              id='type'
              value='sale'
              checked={sidebardata.type === 'sale'}
              onChange={handleFilterChange}
            />
            بيع
          </label>
          <label>
            <input
              type='radio'
              id='type'
              value='rent'
              checked={sidebardata.type === 'rent'}
              onChange={handleFilterChange}
            />
            إيجار
          </label>
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
        {!loading && listings.filter(listing => listing.name.includes(query)).map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          
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