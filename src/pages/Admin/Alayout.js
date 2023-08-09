import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/Admin/SideMenu";

const Alayout = () => {
  return (
    <div className=" min-h-screen grid grid-cols-3 sm:grid-cols-12">
      <div className="col-span-1 w-full sm:col-span-2">
        <SideMenu />
      </div>
      <div className="col-span-2 sm:col-span-10 mx-auto   bg-gray-100 w-full  h-full px-2">
        <Outlet />
      </div>
    </div>
  );
};

export default Alayout;
