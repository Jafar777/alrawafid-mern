import { current } from '@reduxjs/toolkit';
import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux'
import {FaCheck , FaTimes } from 'react-icons/fa'

export default function DashUsers() {
const {currentUser} = useSelector((state) => state.user)
const [users, setUsers] = useState([])
const [showMore, setShowMore] = useState(true);
const [showModal, setshowModal] = useState(false);
const [userIdToDelete, setuserIdToDelete] = useState('');

    useEffect(()=>{
        const fetchUsers = async ()=>{
            try {
                const res = await fetch(`/api/user/getusers?userId=${currentUser._id}`)
                const data = await res.json()
                if (res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        if(currentUser.isAdmin) {
            fetchUsers()
        }
    },[currentUser._id])

    const handleShowMore = async() =>{
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length <9){
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleDeleteUser = async () => {};
    
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
            <Table.Head>
                <Table.HeadCell>تاريخ التسجيل</Table.HeadCell>
                <Table.HeadCell>صورة المستخدم </Table.HeadCell>
                <Table.HeadCell>اسم المستخدم  </Table.HeadCell>
                <Table.HeadCell>ايميل المستخدم  </Table.HeadCell>
                <Table.HeadCell>مشرف </Table.HeadCell>
                <Table.HeadCell>الحذف</Table.HeadCell>
                
            </Table.Head>
            {users.map((user)=>(
                <Table.Body className='divide-y' key={user._id}>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                        <Table.Cell>
                            {new Date(user.createdAt).toLocaleDateString()}
                            </Table.Cell>
                            <Table.Cell>
                               

                                    <img src={user.profilePicture} alt={user.username} className='w-10 h-10 object-cover bg-gray-500 rounded-full' />

                               
                            </Table.Cell>
                            <Table.Cell>
                               
                                    {user.username}
                                
                            </Table.Cell>
                            <Table.Cell>
                                {user.email}
                            </Table.Cell>
                            <Table.Cell>
                                {user.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}
                            </Table.Cell>
                            <Table.Cell>
                                <span onClick={()=>{
                                    setshowModal(true);
                                    setUserIdToDelete(user._id);
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    حذف
                                </span>
                            </Table.Cell>
                           
                    </Table.Row>
                </Table.Body>
            ))}
        </Table>
        {
            showMore && (
                <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                    اظهار المزيد المزيد
                </button>
            )
        }
        </>
      ): (
        <p>ليس لديك اي مستخدم</p>
      )}
      <Modal show={showModal} onClose={()=> setshowModal(false)} popup size='md'> 
        <Modal.Header />
        <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 bg-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>هل انت متأكد انك تريد حذف هذا المستخدم ؟</h3>
                <div className='flex justify-center gap-4'>
                    
                    <Button color='gray' onClick={() => setshowModal(false)}>
                    إلغاء الأمر     
                    </Button>
                    <Button color='failure' onClick={handleDeleteUser}>
                        نعم , انا متأكد  
                    </Button>
                </div>
            </div>
            
        </Modal.Body>
        

    </Modal>
    </div>
  )
}
