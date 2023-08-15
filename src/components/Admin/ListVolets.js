import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineSave } from "react-icons/ai";
import { IoTrashBin } from "react-icons/io5";
import { FcEditImage } from "react-icons/fc";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import {
  getVolets,
  addVolet,
  deleteVolet,
  alterVolet,
} from "../../services/Volet.Service";
const ListVolets = () => {
  const wait = (duration = 1000) => {
    return new Promise((resolve) => {
      window.setTimeout(resolve, duration);
    });
  };

  const schema = yup
    .object({
      label_volet: yup.string().required("fournir le label: Required"),
      description_volet: yup.string().required("Fournir le descriptif"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      label_volet: "",
      description_volet: "",
    },
  });

  const queryClient = useQueryClient();

  //get
  const { isLoading, error, data, isFetching } = useQuery("volets", getVolets);
  const [volet, setVolet] = React.useState(data);
  const [voletToUpdate, setVoletToUpdate] = useState({});
  //post
  React.useEffect(() => {
    setVolet(data);
  }, [data]);

  const handleFilter = (e) => {
    //if (e.target.value === " ") setVolet(data);

    if (data) {
      const newVolets = data.filter((row) => {
        return row.label_volet
          .toLowerCase()
          .match(e.target.value.toLowerCase());
      });
      setVolet(newVolets);
    }
  };

  //put---created volets
  const mutatePost = useMutation({
    mutationFn: addVolet,
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("volets");
      //console.log("object");
    },
    onError: (error) => {
      //console.log(error.response.data);
      console.log(error.response.status);
    },
  });

  //post==delete volet
  const mutateDelete = useMutation(deleteVolet, {
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("volets");
    },
  });

  //patch==update volet
  const mutateUpdate = useMutation({
    mutationFn: alterVolet,
    onSuccess: () => {
      // queryClient.invalidateQueries("posts");
      queryClient.invalidateQueries("volets");
    },
  });

  if (error) return "An error has occurred: " + error.message;
  if (isLoading) return <p>is isLoading......</p>;

  const onSubmit = async (data, e, response) => {
    e.preventDefault();
    try {
      ///cas de la mise a jour soit quelque chose dans le state a mettre a jour
      if (Object.keys(voletToUpdate).length !== 0) {
        //console.log(0);

        if (data) {
          //     console.log("object")
          //   console.log(voletToUpdate);
          //   console.log(data);
          const id = voletToUpdate.Id_volet;
          const post = await mutateUpdate
            .mutateAsync({ id, data })
            .then((res) => res)
            .catch((error) => console.log(error));
          //console.log(post);
          if (post.status === 201) toast.success("volet updated successfully");
          else {
            toast.error("volet non mis a jour " + post.data.message);

            throw new Error(post.data.message);
          }
        }

        setVoletToUpdate({});
        reset({
          label_volet: "",
          description_volet: "",
        });
        return;
      }

      await wait(2000);
      if (data) {
        const post = await mutatePost
          .mutateAsync(data)
          .then((res) => res)
          .catch((error) => console.log(error));
        // if (mutatePost.isError) console.log(mutatePost.error);
        //   .then((res) => {
        //     toast.success("volet created successfully");
        // console.log(post);
        if (post.status !== 409 && post.status !== 500)
          toast.success("volet created successfully");
        else {
          toast.error("volet non enregistre car existe deja en base");

          throw new Error(post.message);
        }
        reset({
          label_volet: "",
          description_volet: "",
        });
      }
    } catch (error) {
      //getError(error);
      //toast.error("volet non enregistre");
      //console.log(mutatePost.error);
      console.log(error);
    }
    //save(data);
  };

  const handleDelete = async (id) => {
    if (id) {
      mutateDelete.mutate(id);
    }
  };

  //   const handleUpdateValueOfVolet = () => {

  //     reset({
  //       label_volet: "",
  //       description_volet: "",
  //     });
  //   };

  const columns = [
    {
      name: <span className="font-extrabold text-red-900 text-xl">ID</span>,
      selector: (row) => row.Id_volet,
      width: "10%",
    },
    {
      name: <span className="font-extrabold text-red-900 text-xl">Label</span>,
      selector: (row) => row.label_volet,
      sortable: true,
      width: "20%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">Descriptif</span>
      ),
      selector: (row) => row.description_volet,
      sortable: true,
      width: "40%",
    },
    {
      name: (
        <span className="font-extrabold text-red-900 text-xl">Actions</span>
      ),
      cell: (row) => (
        <div className="flex justify-center gap-x-4 text-2xl w-full">
          <button
            onClick={() => {
              setVoletToUpdate({
                Id_volet: row.Id_volet,
                label_volet: row.label_volet,
                description_volet: row.description_volet,
              });
              reset({
                label_volet: row.label_volet,
                description_volet: row.description_volet,
              });
            }}
            className=" text-teal-900 mx-2 font-extrabold"
          >
            {" "}
            <FcEditImage />
          </button>
          <button
            onClick={() => {
              handleDelete(row.Id_volet);
            }}
            className=" text-red-900 font-extrabold"
          >
            {" "}
            <IoTrashBin />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "30%",
    },
  ];
  const title = (
    <span className="text-sky-700 text-base font-bold">
      liste des volets disponibles
    </span>
  );
  const customStyles = {
    headRow: {
      style: {
        fontSize: "1rem",
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

    // rows: {
    //   style: {
    //     minHeight: "72px", // override the row height
    //   },
    // },
  };
  return (
    <div className="flex items-center justify-center flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%]  bg-slate-50 rounded-lg text-base text-center shadow-lg shadow-gray-500 px-4 py-6 "
      >
        <div className=" mb-1 relative">
          <input
            type="text"
            placeholder="Label volet"
            className="placeholder-gray-400 placeholder:italic uppercase ml-2 pl-2 pr-6  bg-sky-100  border border-transparent  form-control block w-full py-2  font-normal text-gray-900 bg-clip-padding    rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
            {...register("label_volet")}
          />
          {/* errors will return when field validation fails  */}
          {errors.label_volet && (
            <span className="text-red-500 text-sm font-bold mb-2   absolute block">
              {errors.label_volet.message}
            </span>
          )}
        </div>

        {/* include validation with required or other standard HTML validation rules */}
        <div className="mb-1 relative">
          <input
            type="text"
            placeholder="description"
            className="placeholder-gray-400 placeholder:italic uppercase  ml-2 pl-2 pr-6 bg-sky-100 border  border-transparent h-full form-control block w-full py-2  font-normal text-gray-900 bg-clip-padding    rounded-lg transition ease-in-out m-0 focus:text-gray-700  focus:border-blue-600 focus:outline-none"
            {...register("description_volet")}
          />

          {/* errors will return when field validation fails  */}
          {errors.description_volet && (
            <span className="text-red-500 text-sm font-bold mb-2   absolute block">
              {errors.description_volet.message}
            </span>
          )}
        </div>

        <div className="flex w-full items-center justify-center">
          <button
            className="  mt-2 w-fit px-4 flex items-center justify-center disabled:cursor-not-allowed cursor-pointer   py-2 bg-sky-700  
              text-xl leading-snug uppercase rounded-xl shadow-md hover:bg-sky-800 hover:shadow-lg focus:bg-sky-800 focus:shadow-lg 
              focus:outline-none focus:ring-0 active:bg-sky-900 active:shadow-lg transition duration-150 ease-in-out "
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {" "}
            {!isSubmitting ? (
              <>
                <span className="mr-6 uppercas text-white font-extrabold hover:mr-4">
                  {Object.keys(voletToUpdate).length !== 0
                    ? "Update"
                    : "enregistrer"}
                </span>
                <span className="text-white text-2xl font-extrabold hover:ml-4">
                  <AiOutlineSave />
                </span>
              </>
            ) : (
              <div className=" flex justify-between items-center text-white mb-1">
                loading{" "}
                <div
                  className=" text-green-500 spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ml-2"
                  role="status"
                >
                  {/* <Spinner aria-label="Default status example" /> */}
                  <span className="visually-hidden"></span>
                </div>
              </div>
            )}
          </button>
        </div>
      </form>

      <div className="mt-2 bg-sky-100 p-1 rounded-lg shadow-xl shadow-white w-[100%] uppercase ">
        <DataTable
          columns={columns}
          data={volet}
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          subHeader
          customStyles={customStyles}
          subHeaderComponent={
            <>
              {title}
              <input
                type="text"
                placeholder="Rechercher un volet"
                onChange={handleFilter}
                className="ml-2 border-2 px-6 text-base border-sky-800 rounded-md w-[50%] outline-none"
              />
            </>
          }
          subHeaderAlign="right"
          pagination
          dense
          fixedHeader
          direction="auto"
          //paginationComponent={BootyPagination}
          //selectableRows
          //selectableRowsComponent={BootyCheckbox}
        />
      </div>
      {/* <table className="border-separate border  border-slate-400 mt-2 table-fixed w-[80%]">
        <thead>
          <tr>
            <th className="w-10 border-2 bg-sky-300 border-slate-300 ...">
              ID
            </th>
            <th className="w-40 border-2 bg-sky-300 border-slate-300 ...">
              Label
            </th>
            <th className="w-96 border-2 bg-sky-300 border-slate-300 ...">
              Descriptif
            </th>
            <th className="w-40 border-2 bg-red-300 border-slate-300 ...">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {data.map((volet) => (
          <li key={volet.id}>
            {volet.id} - {volet.label}
            <span>{volet.createdAt}</span>
            <button
              
            >
              X
            </button>
          </li>
       // ))} */}

      {/* {data.data.map((volet) => (
            <tr key={volet.Id_volet}>
              <td className="border-2 px-2 border-slate-300 w-2">
                {volet.Id_volet}
              </td>
              <td className="border-2 px-2 border-slate-300 uppercase">
                {volet.label_volet}
              </td>
              <td className="border-2 px-2 border-slate-300 uppercase">
                {volet.description_volet}
              </td>
              <td className="flex justify-around py-1 border-2 px-2 border-slate-300 ">
                <button
                  onClick={() => {
                    handleDelete(volet.Id_volet);
                  }}
                  className="uppercase hover:bg-red-800 bg-red-500  rounded-md text-base text-white font-extrabold px-4 "
                >
                  delete
                </button>
                <button className="uppercase hover:bg-teal-800 bg-teal-700  rounded-md text-base text-white font-extrabold px-4 ">
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div>{isFetching ? "Data Updating..." : ""}</div>
    </div>
  );
};

export default ListVolets;
