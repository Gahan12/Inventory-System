import SideMenu from "../Components/SideMenu";
import React, { useState, useEffect } from "react";
import RequesHeader from "../Components/RequestHeader";
import AllRequests from "../Components/AllRequests";

function Requests(props) {
  const [flag, setFlag] = useState(true);

  const toggle = () => {
    if (flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };

  return (
    <>
      <div className="flex h-full w-full">
        <div className="w-full basis-1/4 ">
          <SideMenu setData={props.setData} data={props.data} />
        </div>
        <div className=" w-full basis-100">
          <RequesHeader flag={flag} toggle={toggle} />
          <AllRequests
            flag={flag}
            adminRequests={props.adminRequests}
            productRequests={props.productRequests}
            folders={props.folders}
          />
        </div>
      </div>
    </>
  );
}

export default Requests;
