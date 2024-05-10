import React, { useEffect, useState } from "react";
import SideMenu from "./SideMenu";
import TableOne from "./TableOne";

function Summary({ products, amount, quantity, data, setData }) {
  return (
    <>
      <div>
        <SideMenu data={data} setData={setData} />
      </div>
      <div className="h-screen w-full">
        <div className=" flex justify-center w-auto h-20 border-b-2 border-zinc-300 shadow-md">
          <div className="h-full mr-20 flex justify-center items-center text-3xl text-slate-800 font-semibold">
            Product Summary
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="p-4  flex mr-10 flex-row justify-center w-3/4">
            <div className="h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center">
              <h3 className="mb-1 text-3xl">IMS</h3>
              <h2 className="mt-2 font-normal">Products</h2>
            </div>
            <div className="h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center">
              <h3 className="mb-1 text-3xl">{products.length}</h3>
              <h2 className="mt-2 font-normal">Folders</h2>
            </div>
            <div className="h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center">
              <h3 className="mb-1 text-3xl">{quantity}</h3>
              <h2 className="mt-2 font-normal">Total Quantity</h2>
            </div>
            <div className="h-40 w-40 ml-10 bg-slate-200 rounded-md flex flex-col justify-center items-center">
              <h3 className="mb-1 text-3xl">{amount}</h3>
              <h2 className="mt-2 font-normal">Grand Total</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="mr-80">
            {products.length ? (
                          <TableOne products={products} data={data} />
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Summary;
