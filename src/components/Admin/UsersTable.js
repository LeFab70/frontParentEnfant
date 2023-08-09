import React from "react";
import DataTable from "react-data-table-component";
//import { AiOutlineSave } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { FcLock } from "react-icons/fc";
const UsersTable = ({ data }) => {
  //console.log(data);

  const columns = [
    {
      name: <span className="font-extrabold text-red-900 text-base">ID</span>,
      selector: (row) => row.id,
      width: "2%",
    },
    {
      name: <span className="font-extrabold text-red-900 text-xl">login</span>,
      selector: (row) => row.name,
      sortable: true,
      width: "25%",
    },
    {
      name: <span className="font-extrabold text-red-900 text-xl">Pseudo</span>,
      selector: (row) => row.pseudo,
      sortable: true,
      width: "15%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">role</span>
      ),
      selector: (row) => (
        <span
          className={`text-gray-100 px-6 text-xl rounded-lg py-1 font-bold ${
            row.role.toLowerCase() !== "admin" ? "bg-red-500" : "bg-green-700"
          }`}
        >
          {" "}
          {row.role}{" "}
        </span>
      ),
      sortable: true,
      width: "15%",
    },

    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">status</span>
      ),
      selector: (row) => (
        <span
          className={`text-gray-100 px-6 text-xl rounded-lg py-1 font-bold ${
            row.status.toLowerCase() !== "actif" ? "bg-red-200" : "bg-green-400"
          }`}
        >
          {" "}
          {row.status}{" "}
        </span>
      ),
      sortable: true,
      width: "15%",
    },


    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">Actions</span>
      ),
      cell: (row) => (
        <div className="flex justify-center gap-x-4 text-xl w-full">
          <button className=" text-gray-100 px-4 uppercase my-1 rounded-md  cursor-pointer transition ease-in-out duration-150 font-extrabold text-2xl">
            <FcLock />
          </button>
          <button className=" text-red-900 font-extrabold">
            <IoTrashBin />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "20%",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        fontSize: "0.75rem",
        fontWeight: "900",
        textTransform: "uppercase",
        backgroundColor: "#aecae8",
      },
    },

    cells: {
      style: {
        fontSize: "0.75rem",
      },
    },
  };

  //console.log(rows)
  return (
    <>
      <div className="mt-2 bg-sky-100 p-1 rounded-lg shadow-xl shadow-white w-[90%] uppercase ">
        <DataTable
          columns={columns}
          data={data}
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          customStyles={customStyles}
          // subHeaderComponent={
          //   <>
          //     <input
          //       type="text"
          //       placeholder="Rechercher un volet"
          //       // onChange={handleFilter}
          //       className="ml-2 border-2 px-6 text-base border-sky-800 rounded-md w-[50%] outline-none"
          //     />
          //   </>
          // }
          subHeaderAlign="right"
          pagination
          dense
          fixedHeader
          direction="auto"
        />
      </div>
    </>
  );
};

export default UsersTable;
