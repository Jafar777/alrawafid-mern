import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef,useState  } from 'react';
import {useSelector} from 'react-redux'
import {getStorage ,ref ,uploadBytesResumable , getDownloadURL } from 'firebase/storage'
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateFailure,updateSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile,setImageFile] = useState(null);
    const [imageFileUrl, setimageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setimageFileUploadingProgress] = useState(null);
    const [imageFileUploadingError, setimageFileUploadingError] = useState(null);
    const [imageFileUploading, setimageFileUploading] = useState(false);
    const [updateUserSuccess, setupdateUserSuccess] = useState(null);
    const [updateUserError, setupdateUserError] = useState(null);
    const [formData, setFormData]= useState({})
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e)=> {
        
        const file = e.target.files[0];
        if(file){
            setImageFile(file);
            setimageFileUrl(URL.createObjectURL(file))

        }

    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])

    const uploadImage = async () => {
        
    setimageFileUploading(true);

    setimageFileUploadingError(null)    
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name ;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
        'state_changed',
        (snapshot)=> {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
            setimageFileUploadingProgress(progress.toFixed(0));
        },
        (error) => {
            setimageFileUploadingError("Could not upload image (file must be less than 2mb"); 
            setimageFileUploadingProgress(null);
            setImageFile(null);
            setimageFileUrl(null);
            setimageFileUploading(false)
        },
        () =>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFile(downloadURL)
                setFormData({...formData, profilePicture: downloadURL});
                setimageFileUploading(false);
            })
        }

    )
    }

    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setupdateUserError(null);
        setupdateUserSuccess(null);
        if (Object.keys(formData).length === 0){
            setupdateUserError("لم يحدث تغيير");
            return;
        }
        if (imageFileUploading){
            setupdateUserError("الرجاء انتظار اكتمال تحميل الصورة");
            return
        }
        try {
            dispatch(updateStart());
            const res = await fetch (`/api/user/update/${currentUser._id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok){
                dispatch(updateFailure(data.message));
                setupdateUserError(data.message);
            }else{
                dispatch(updateSuccess(data));
                setupdateUserSuccess("تم تحديث الحساب بنجاح");
            }
        }catch (error){
            dispatch(updateFailure(error.message));
            setupdateUserError(error.message);
        }
    };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>الحساب الشخصي</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" accept="/image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={()=> filePickerRef.current.click()}>
            {imageFileUploadingProgress && (
                <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}% `}
                strokeWidth={5}
                styles={{
                    root : {
                        width :'100%',
                        height : '100%',
                        position: "absolute",
                        top : 0,
                        left : 0,
                },
                path : {
                    stroke: `rgba(62,152,199, ${imageFileUploadingProgress / 100 })`,
                },
            }}
                />
            )}
        <img src={imageFileUrl || currentUser.profilePicture} className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`} />
        </div>
        {imageFileUploadingError && (<Alert color='failure'>{imageFileUploadingError}</Alert>) } 
        
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}
        />
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} 
        />
        <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='greenToBlue' outline>
            تحديث 
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>حذف الحساب</span>
        <span className='cursor-pointer'>تسجيل الخروج </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
            {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
            {updateUserError}
        </Alert>
      )}
    
    </div> 
  )
}
