import logo from "../Assets/logo.jpg"
import { Link } from 'react-router-dom';
import background from "../Assets/ims2-modified.jpg"


function Home() {
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
                    <Link to ="/">HOME</Link>
                    <Link to ='/dashboard'>IMS</Link>
                </div>
            </div>
            <div className=" h-screen flex flex-col items-center mt-30 " style={{ backgroundImage: `url(${background})` }}>
                <div className="bg-zinc-950 w-3/4 rounded-md opacity-75 text-white flex justify-center text-center p-10 mt-20">
                    <p className="text-5xl font-medium">Inventory management software 
                     <br /> designed for Indian businesses</p>
                </div>
                <div className="flex flex-col justify-around items-center bg-zinc-950 opacity-75 w-3/4 text-white flex justify-center text-center p-2">
                    <p className="text-md">
                    Manage orders. Track inventory. Oversee warehouses. One inventory management <br />software to run all your inventory operations.
                    </p>
                    <div className="flex w-1/3 justify-around p-6">
                    <Link  to="/signup" className="flex  justify-center items-center text-black font-medium text-md bg-white w-1/3 rounded-md h-12 ">
                        SIGN UP
                    </Link>
                    <Link to="/signin" className="flex justify-center items-center text-black font-medium text-md bg-white w-1/3 rounded-md h-12 ">
                        LOG IN
                    </Link>
                    </div>
                </div>
                
            </div>
        </>
     );
}

export default Home;