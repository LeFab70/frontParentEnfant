import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/public/Footer";
import Header from "../../components/public/Header";

const Layout = () => {
  return (
    <div className=" overflow-hidden max-w-2xl md:max-w-7xl mx-auto px-2 sm:px-0 flex flex-col h-screen justify-between">
      {/* <div className=" mx-2 sm:mx-0"> */}
      <Header />
      <div className="mb-auto">
        <Outlet />
      </div>

      <Footer />
      {/* </div> */}
    </div>
  );
};

export default Layout;
