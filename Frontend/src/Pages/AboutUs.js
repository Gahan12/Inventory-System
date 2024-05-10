import React from 'react'
import SideMenu from '../Components/SideMenu';
import Profile from '../Assets/profile.jpg';
import { Link } from "react-router-dom";
import logo from "../Assets/logo.jpg";

function AboutUs() {
  return (
    <>
    <div className="flex justify-between w-full p-2 bg-slate-50">
                <div className="basis-1/6">
                    <img className="h-12 w-12 ml-10 " src={logo} alt="Inventory Logo"></img>  
                </div> 
                <div className="text-slate-800 text-sm basis-1/3 flex justify-around items-center">
                    <Link to="/signin">SIGN IN</Link>
                    <Link to="/signup">SIGN UP</Link>
                    <Link>ABOUT US</Link>
                    <Link>CONTACT</Link>
                    <Link>IMS</Link>
                </div>
     </div>
     <div className='flex justify-center items-center h-screen w-full'>
        <div className="mx-auto max-w-7xl px-2 md:px-0">
        <div className="">
        <h1 className="text-3xl font-bold">Our Team</h1>
        <p className="my-4 text-gray-500">
            Dynamic and innovative software development team specializing in delivering <br/> high-quality, scalable solutions. With a strong focus on collaboration and agile  <br />methodologies, we excel in crafting efficient, user-centric applications.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-[30px] md:grid-cols-3">
        <div className="flex flex-col items-center text-start">
          <div
            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img
              src={Profile}
              alt=""
              className="z-0 h-full w-full rounded-[10px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl ml-4 font-semibold text-white">Pritam Shejul</h1>
              <h6 className="text-base ml-4 text-white">Full Stack Developer</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-start">
          <div
            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
              className="z-0 h-full w-full rounded-[10px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-semibold text-white">Mark Cook</h1>
              <h6 className="text-base text-white">Backend Developer</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-start">
          <div
            className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px] bg-red-300"
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDB8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
              className="z-0 h-full w-full rounded-[10px] object-cover"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-semibold text-white">Ketty</h1>
              <h6 className="text-base text-white">Designer</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    </>
  )
}

export default AboutUs;
