import React, { memo } from 'react'
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import TableTwo from './TableTwo';

const CategorySummary = (props) => {

  return (
    <>
        <div>
              <SideMenu data={props.data} setData={props.setData} />
        </div>
        <div className='h-screen w-full'>
            <div className=" flex justify-center w-auto h-20 border-b-2 border-zinc-300 shadow-md">
                <div className="h-full mr-20 flex justify-center items-center text-3xl text-slate-800 font-semibold">
                    Category Summary
                </div>
            </div>
            <div className='flex flex-row justify-end'>
                <div className='p-4  flex mr-10 flex-row justify-center w-3/4'>
                    <div className='h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center'>
                        <h3 className='mb-1 text-3xl'>IMS</h3>
                        <h2 className='mt-2 font-normal'>Categories</h2>
                    </div>
                    <div className='h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center'>
                        <h3 className='mb-1 text-3xl'>{props.folders.length}</h3>
                        <h2 className='mt-2 font-normal'>folders</h2>
                    </div>
                    <div className='h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center'>
                        <h3 className='mb-1 text-3xl'>{props.products.length}</h3>
                        <h2 className='mt-2 font-normal'>Total Products</h2>
                    </div>
                    <div className='h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center'>
                        <h3 className='mb-1 text-3xl'>{props.amount}</h3>
                        <h2 className='mt-2 font-normal'>Grand Total</h2>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-end'>
                <div className='mr-80'>
                      <TableTwo folders={props.folders} data={props.data} />
                </div>
            </div>
        </div>
    </>
  )
}

export default CategorySummary