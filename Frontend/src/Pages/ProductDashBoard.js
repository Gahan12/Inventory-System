import Inventory from "../Components/Inventory";
import SideMenu from "../Components/SideMenu";
import AddFolder from "../Components/AddFolder";
import Folder from "../Components/Folder";
import React, { useState } from "react";
import Products from "../Components/Products";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductDashBoard(props) {
  let { categoryId } = useParams();

  let category = null;
  for (let i = 0; i < props.folders.length; i++) {
    if (props.folders[i]._id == categoryId) {
      category = props.folders[i].data;
      break;
    }
  }

  return (
    <>
      <div className="flex h-full w-full">
        <div className="w-full basis-1/4 ">
                  <SideMenu data={props.data} setData={props.setData} />
        </div>
        <div className=" w-full basis-100">
          <div className=" sm:flex sm:justify-around flex w-auto h-20 border-b-2 border-zinc-300 shadow-md">
            <div className="h-full flex justify-center items-center text-3xl text-slate-800 font-semibold">
              Inventory Items
            </div>
            {props.data.role == "Admin" && (
              <div className="h-full w-1/2 text-white font-semibold  flex sm:justify-end items-center">
                <Link
                  to={`/addproduct/${categoryId}`}
                  className="flex  justify-center items-center text-white font-medium text-md bg-red-500 w-1/3 rounded-md h-12 "
                >
                  ADD ITEM
                </Link>
              </div>
            )}
          </div>
                  <Products category={category} categoryId={categoryId} data={props.data} />
        </div>
      </div>
    </>
  );
}

export default ProductDashBoard;
