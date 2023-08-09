import React from "react";
import { serviceUsers } from "../../../services";
import { useQuery } from "react-query";
//import UsersEdit from "./UsersEdit";
import UsersTable from "../../../components/Admin/UsersTable";
import UsersEdit from "./UsersEdit";

const UsersAdd = () => {
  const { isLoading, error, data } = useQuery(
    "users",
    serviceUsers.getAllUsers
  );
  const users = data || { data: [] };
  if (isLoading) {
    return (
      <span className="text-xl text-red-500 font-extrabold mt-10 px-3 ">
        {" "}
        Data is Loading please wait a few seconds
        <span className="text-gray-900">......</span>
      </span>
    );
  }
  if (error)
    return (
      <span className="text-xl text-red-500 font-extrabold mt-4 px-3 ">
        {" "}
        An error has occurred:
        <span className="text-gray-900"> {error.message}</span>
      </span>
    );
  return (
    <>
     <UsersEdit />
     <div className="flex gap-4 flex-col sm:flex-row justify-center mt-1 px-2 ">
     
     <UsersTable data={users.data} />
   </div>
    </>
    
  );
};

export default UsersAdd;
