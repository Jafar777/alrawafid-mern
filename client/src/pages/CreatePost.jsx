import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
            انشاء طلب عقاري
        </h1>
        <form className='flex flex-col gap-4'>
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput type='text' placeholder='العنوان' required id='title' className='flex-1'/>
                <Select>
                    <option value="uncategorized">إختر نوع العقار </option>
                    <option value="apartment">شقة </option>
                    <option value="land">أرض </option>
                    <option value="villa">فيلا </option>
                    <option value="building">عمارة </option>
                    <option value="shop">محل </option>
                    <option value="lounge">استراحة </option>
                    <option value="gasstation">محطة بنزين </option>
                    <option value="other"> نوع اخر </option>
                </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500  border-dotted p-3">
                <FileInput type='file' accept='image/* ' />
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>تحميل الصور</Button>
            </div>
            <ReactQuill theme='snow' placeholder='اكتب تفاصيل العقار'className='h-72 mb-12 ' required/>
            <Button type='submit' gradientDuoTone='purpleToPink' >
                نشر
            </Button>
        </form>
      
    </div>
  )
}
