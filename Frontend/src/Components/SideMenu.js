import { Link } from "react-router-dom";
import logo from "../Assets/cartlogo.jpg";

function SideMenu(props) {
  const click = () => {
    props.setData("");
  };

  return (
    <>
      <div className="fixed bg-zinc-800 text-lg text-white w-1/5 h-screen">
        <div className="flex justify-around items-center flex-col h-3/4 w-full">
          <div className="p-4 flex shadow-md rounded-md w-full h-full items-center justify-center">
            <div className="mr-2 mt-1">
              <img className="h-7 w-8" src={logo} alt="Inventory Logo"></img>
            </div>
            <Link to="" className="font-medium">
              IMS system
            </Link>
          </div>
          <Link
            to="/dashboard"
            className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
          >
            Dashboard
          </Link>
          <Link
            to="/summary"
            className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
          >
            Categories
          </Link>
          {props.data.role == "Customer" && (
            <Link
              to="/contactus"
              className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
            >
              Contact Us
            </Link>
          )}
          {props.data.role == "Admin" && (
            <Link
              to="/requests"
              className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
            >
              Requests
            </Link>
          )}
          <Link
            to="/"
            className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
          >
            Profile
          </Link>
          <Link
            onClick={click}
            to="/"
            className="text-sm w-full shadow-md hover:bg-red-500 h-full flex justify-center items-center"
          >
            Log Out
          </Link>
        </div>
      </div>
    </>
  );
}

export default SideMenu;
