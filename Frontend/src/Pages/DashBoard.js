import Inventory from "../Components/Inventory";
import SideMenu from "../Components/SideMenu";
import AddFolder from "../Components/AddFolder";
import Folder from "../Components/Folder";
import React, { useState,useEffect } from 'react';
import Products from "../Components/Products";

function Dashboard(props) {

    useEffect(() => {
        if (props.data == '') {
            window.location.pathname = '/';
        }
    }, []);

    return ( 
        <>
            <div className="flex h-full w-full">
                <div className="w-full basis-1/4 ">
                    <SideMenu setData={props.setData} data={props.data} />
                </div>
                <div className=" w-full basis-100">
                    <Inventory data={props.data} />
                    <Folder folders={props.folders} />
                </div>
            </div>
        </>
     );
}

export default Dashboard;