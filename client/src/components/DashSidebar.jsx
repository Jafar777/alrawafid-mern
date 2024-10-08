import {useEffect , useState} from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser , HiArrowSmRight, HiDocumentText, HiOutlineUserGroup} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { useSelector } from 'react-redux' 
import { LuFiles } from "react-icons/lu";
import { CiFileOn } from "react-icons/ci";

export default function DashSidebar() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { currentUser } = useSelector((state) => state.user);
    const [tab,setTab] = useState('')

    useEffect(()=> {
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if (tabFromUrl){
        setTab(tabFromUrl);
      }
    }, [location.search]);

    const handleSignOut = async () =>{
      try {
          const res = await fetch('/api/user/signout' , {
              method: 'POST',
          })
          const data = await res.json();
          if(!res.ok){
              console.log(data.message);
          }else{
            dispatch(signOutSuccess())
          }
      } catch (error) {
          console.log(error.message)
          
      }
    }
    
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'مشرف' : 'مستخدم'}
              labelColor='dark'
              as='div'
              >
                الحساب
            </Sidebar.Item>
            </Link>

            {currentUser.isAdmin && (
              <Link to='/dashboard?tab=posts'>
            <Sidebar.Item
              active={tab === 'posts'}
              icon={CiFileOn}
              as='div'
              >
              طلباتي العقارية
            </Sidebar.Item>
            </Link>
            )}

            {currentUser.isAdmin && (
              <Link to='/dashboard?tab=users'>
            <Sidebar.Item
              active={tab === 'users'}
              icon={HiOutlineUserGroup}
              as='div'
              >
                المستخدمين
            </Sidebar.Item>
            </Link>
            )}
            
            
            <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                تسجيل الخروج
            </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
