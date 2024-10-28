import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Textarea, TextInput } from 'flowbite-react';




export default function CreateListing() {
 
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    city:'',
    type: '',
    type2: '',
    bedrooms: 0,
    bathrooms: 0,
    regularPrice: 'عند التواصل',
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('فشل تحميل الصورة (الحد الأقصى 2 ميغا للصورة)');
          setUploading(false);
        });
    } else {
      setImageUploadError('يمكنك تحميل 6 صور كحد اقصى لكل عرض');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`التحميل ${progress}% تم`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('يجب تحميل صورة واحدة على الأقل');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('السعر المخفض يجب ان يكون أقل من السعر العادي');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
            إنشاء عرض جديد
            </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1' id='arabic'>
          <TextInput
            type='text'
            placeholder='اسم العقار'
            id='name'
            maxLength='62'
            minLength='8'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <Textarea
            type='text'
            placeholder='وصف العقار'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <TextInput
            type='text'
            placeholder='نوع العقار'
            id='type2'
            required
            onChange={handleChange}
            value={formData.type2}
          />
          <TextInput
            type='text'
            placeholder='المدينة'
            id='city'
            required
            onChange={handleChange}
            value={formData.city}
          />
          <TextInput
            type='text'
            placeholder='العنوان'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>بيع</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>إيجار</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>مواقف سيارات</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>مفروش</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>عرض</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='0'
                max='10'
                required
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>غرف النوم</p>
            </div>
            
           



            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='0'
                max='10'
                required
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>الحمامات</p>
            </div>







            <div className='flex items-center gap-2'>
              <input
                type='string'
                id='regularPrice'
                required
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>السعر</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / شهريا)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  required
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                
                <div className='flex flex-col items-center'>
                  <p>السعر المخفض</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / شهريا)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4' id='arabic'>
          <p className='font-semibold'>
             الصور :
            <span className='font-normal text-gray-600 ml-2'>
               ستكون هذه خلفية العقار (الحد الأقصى 6)
            </span>
          </p>
          <div className='flex gap-4'>
            <input
              onChange={(e) => setFiles(e.target.files)}
              className='p-3 border border-gray-300 rounded w-full'
              type='file'
              id='images'
              accept='image/*'
              multiple
            />
            <Button outline gradientDuoTone="greenToBlue"
              type='button'
              disabled={uploading}
              onClick={handleImageSubmit}
            >
              {uploading ? 'جاري التحميل' : 'تحميل'}
            </Button>
          </div>
          <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className='flex justify-between p-3 border items-center'
              >
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                >
                  حذف
                </button>
              </div>
            ))}
          <Button outline gradientDuoTone="purpleToPink"
          type='submit'
            disabled={loading || uploading}
            
          >
            {loading ? 'Creating...' : 'نشر العرض'}
          </Button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
}