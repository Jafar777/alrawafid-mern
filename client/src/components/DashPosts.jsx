import { current } from '@reduxjs/toolkit';
import { Button, Modal, Spinner, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function DashPosts() {
const {currentUser} = useSelector((state) => state.user)
const [userPosts, setUserPosts] = useState([])
const [showMore, setShowMore] = useState(true);
const [showModal, setshowModal] = useState(false);
const [postIdToDelete, setPostIdToDelete] = useState('');
const [loading ,setLoading] = useState(true);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if (res.ok){
                    setLoading(false);
                    setUserPosts(data.posts);
                    if(data.posts.length<9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
                setLoading(false);
            }
        };
        if(currentUser.isAdmin) {
            fetchPosts()
        }
    },[currentUser._id])
    

    const handleShowMore = async() =>{
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length <9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDeletePost = async()=>{
        setshowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {method:'DELETE',}
            );
            const data = await res.json();
            if (!res.ok){
                console.log(data.message);
            }
            else{
                setUserPosts((prev) =>
                     prev.filter((post)=> post._id !== postIdToDelete)
            )
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    if (loading) return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            <Spinner size='xl'></Spinner>
        </div>
        );
  return (
    
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
        <div className="">
            <Link to='/search' className='text=sm sm:text-sm text-teal-500 font-bold hover:underline'>
            <h3 className='text-right'>رؤية جميع الطلبات العقارية</h3>
             
            </Link>
        </div>
        <h1 className='my-7 text-center font-semibold text-3xl'>طلباتك التي نشرتها</h1>
        <Table hoverable className='shadow-md'>
            
            <Table.Head>
                <Table.HeadCell>تاريخ التعديل</Table.HeadCell>
                <Table.HeadCell>صورة الطلب </Table.HeadCell>
                <Table.HeadCell>عنوان الطلب </Table.HeadCell>
                <Table.HeadCell>نوع الطلب</Table.HeadCell>
                <Table.HeadCell>الحذف</Table.HeadCell>
                <Table.HeadCell>
                    <span>التعديل</span>
                </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post)=>(
                <Table.Body className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                            {new Date(post.updatedAt).toLocaleDateString()}
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/post/${post.slug}`}>

                                    <img src={post.image} alt={post.title} className='w-20 h-10 object-cover bg-gray-500' />

                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {post.category}
                            </Table.Cell>
                            <Table.Cell>
                                <span onClick={()=>{
                                    setshowModal(true);
                                    setPostIdToDelete(post._id);
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    حذف
                                </span>
                            </Table.Cell>
                            <Table.Cell>
                                <Link className='text-teal-500 hover:underline ' to={`/update-post/${post._id}`}>
                                <span>
                                    تعديل 
                                </span>
                                </Link>
                                
                            </Table.Cell>
                    </Table.Row>
                </Table.Body>
            ))}
        </Table>
        {
            showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                    اظهار المزيد
                </button>
            )
        }
        </>
      ): (
        <p>ليس هنالك اي عرض عقاري حتى الان</p>
      )}
      <Modal show={showModal} onClose={()=> setshowModal(false)}    popup size='md'> 
         <Modal.Header />
            <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 bg-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>هل انت متأكد انك تريد حذف هذا العرض العقاري ؟</h3>
                <div className='flex justify-center gap-4'>
                    
                    <Button color='gray' onClick={() => setshowModal(false)}>
                    إلغاء الأمر     
                    </Button>
                    <Button color='failure' onClick={handleDeletePost}>
                        نعم , انا متأكد  
                    </Button>
                </div>
            </div>
            
            </Modal.Body>
        

        </Modal>
    </div>
    
  )
}
