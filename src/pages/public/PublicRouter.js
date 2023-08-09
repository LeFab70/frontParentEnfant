import React from "react";
import { Route, Routes } from "react-router-dom";
///import AuthGaurd from "../../_helps/AuthGaurd";
import { Contact, Layout, Errors, Home, Service } from "./Index";


// {/* <Route
// element={
//   <AuthGaurd>
//     <Layout />
//   </AuthGaurd>
// }
// > */}
const PublicRouter = () => {
  return (
    <Routes>
      <Route
        element={
          
            <Layout />
        
        }
      >
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="service" element={<Service />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Errors />} />
      </Route>
    </Routes>
  );
};

export default PublicRouter;
