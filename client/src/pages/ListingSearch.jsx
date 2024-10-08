import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { Button, TextInput } from 'flowbite-react';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search-listings?${searchQuery}`);
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
      <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            
            <TextInput
              type='text'
              id='searchTerm'
              placeholder='Search...'
              
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
            <label className='whitespace-nowrap font-semibold'>
              البحث
            </label>
          </div>
          <div className='flex flex-col gap-4 '>
            <label className='font-semibold '>نوع العقار</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='all'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>الإيجار & البيع</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>ايجار</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span>بيع</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
               className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span> عرض خاص</span>
            </div>
            </div>
          <div className='flex flex-col gap-2 '>
            <label className='font-semibold'>وسائل الراحة</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>مواقف سيارات</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>مفروش</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"'
            >
              <option value='regularPrice_desc'>السعر الاعلى</option>
              <option value='regularPrice_asc'>السعر الاقل</option>
              <option value='createdAt_desc'>الاحدث</option>
              <option value='createdAt_asc'>الاقدم</option>
            </select>
            <label className='font-semibold'>ترتيب</label>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>
            بحث
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-center text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          نتائج العروض العقارية
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
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}