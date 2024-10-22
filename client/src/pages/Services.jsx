import React from 'react'
import { useState } from "react";
import data from "./data";
import "../index.css";
import { FaPhoneVolume } from "react-icons/fa6";
export default function Services() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  function handleMultiSelection(getCurrentId) {
    let cpyMutiple = [...multiple];
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId);
    else cpyMutiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMutiple);
  }


  return (
    
    <div className='flex flex-col justify-center items-center'>
           
           <div className='flex justify-center items-center custom-font-color1 gap-20 mt-20 md:text-4xl lg:text-4xl font-bold'>
            <h1 className='cursor-default text-xl'> خدمات مجموعة الروافد التجارية</h1>
           </div>
           <p id='arabic' className='mt-6 mb-6 mr-1 ml-1 lg:text-lg md:text-lg text-sm font-bold custom-font-color3 max-w-lg'>تقدم مجموعة الروافد التجارية مجموعة شاملة من الخدمات المتكاملة التي تلبي احتياجات السوق العقاري في المملكة العربية السعودية. تتميز خدماتنا بالاحترافية والجودة العالية، مما يجعلنا الخيار الأمثل لعملائنا. تشمل خدماتنا : </p>
           {/* accordian starts here*/}
            
          <div className="acc-wrapper flex flex-col h-auto w-screen justify-center items-center mt-10 mb-10 gap-5">
            
            <div className="w-96">
              {data && data.length > 0 ? (
                data.map((dataItem) => (
                  <div className="custom-bg-rawafid mb-3 pr-5 p-3">
                    <div
                      onClick={
                        enableMultiSelection
                          ? () => handleMultiSelection(dataItem.id)
                          : () => handleSingleSelection(dataItem.id)
                      }
                      id='arabic' className="custom-font-color1 flex justify-between items-center cursor-pointer text-right text-base font-bold"
                    >
                      <h3>{dataItem.question}</h3>
                      <span>+</span>
                    </div>
                    {enableMultiSelection
                      ? multiple.indexOf(dataItem.id) !== -1 && (
                          <div className="acc-content cursor-default">{dataItem.answer}</div>
                        )
                      : selected === dataItem.id && (
                          <div className="acc-content cursor-default ">{dataItem.answer}</div>
                        )}
                    {/* {selected === dataItem.id ||
                    multiple.indexOf(dataItem.id) !== -1 ? (
                      <div className="content">{dataItem.answer}</div>
                    ) : null} */}
                      </div>
                    ))
                    ) : (
                      <div>No data found !</div>
                    )}
                  </div>
                </div>
                 {/* accordian ends here*/}
    </div>
   
  )
}
