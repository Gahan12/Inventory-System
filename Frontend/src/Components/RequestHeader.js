

function Inventory(props) {
  return (
    <>
      <div className=" sm:flex sm:justify-around flex w-auto h-20 border-b-2 border-zinc-300 shadow-md">
        {props.flag ? (
          <div className="h-full flex justify-center items-center text-3xl text-slate-800 font-semibold">
            Verification of products Requests
          </div>
        ) : (
          <div className="h-full flex justify-center items-center text-3xl text-slate-800 font-semibold">
            Admin SignUp Requests
          </div>
        )}
        <div className="h-full w-1/2 text-white font-semibold  flex sm:justify-end items-center">
          {props.flag ? (
            <button
              onClick={props.toggle}
              className="flex  justify-center items-center text-white font-medium text-md bg-red-500 w-1/3 rounded-md h-12 "
            >
              Admin
            </button>
          ) : (
            <button
              onClick={props.toggle}
              className="flex  justify-center items-center text-white font-medium text-md bg-red-500 w-1/3 rounded-md h-12 "
            >
              Products
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Inventory;
