import React from "react";
import { Routes, Route } from "react-router-dom";
import { Errors } from "../public/Index";
import {EditVolet, Alayout, Dashboard, UsersAdd, UsersEdit, AddMember } from "./Index";
//import Periode from "../../components/Admin/Periode";
import Statistique from "../../statitiques/Statistique";

const AdminRouter = (user) => {
  return (
    <Routes>
      <Route element={<Alayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users">
          <Route path="add" element={<UsersAdd />} />
          <Route path="edit" element={<UsersEdit />} />
        </Route>
        <Route path="members">
          <Route path="add" element={<AddMember />} />
          <Route path="edit" element={<AddMember />} />
        </Route>

        <Route path="volets">
          <Route path="edit" element={<EditVolet />} />
        </Route>
        <Route path="statistique">
          <Route path="show" element={<Statistique />} />
        </Route>
        <Route path="*" element={<Errors />} />
      </Route>
    </Routes>
  );
};

export default AdminRouter;
