import { Link } from "react-router-dom";

function InventoryHeader(props) {
  return (
    <>
      <div className=" sm:flex sm:justify-around flex w-auto h-20 border-b-2 border-zinc-300 shadow-md">
        <div className="h-full flex justify-center items-center text-3xl text-slate-800 font-semibold">
          Inventory Category
        </div>
        {props.data.role == "Admin" && (
          <div className="h-full w-1/2 text-white font-semibold  flex sm:justify-end items-center">
            <Link
              to="/addcategory"
              className="flex  justify-center items-center text-white font-medium text-md bg-red-500 w-1/3 rounded-md h-12 "
            >
              ADD NEW
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default InventoryHeader;
